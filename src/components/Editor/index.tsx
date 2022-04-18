import React, {useState} from 'react';
import * as monaco from 'monaco-editor';
import {useEffect, useRef} from 'react';
import './Editor.styles.scss';

import {createOnigScanner, createOnigString, loadWASM} from 'vscode-oniguruma';
import {SimpleLanguageInfoProvider} from 'textmate/providers';
import {registerLanguages} from 'textmate/register';
import {rehydrateRegexps} from 'textmate/configuration';
import VsCodeDarkTheme from 'textmate/themes/vs-dark-plus-theme';

import type {LanguageId} from 'textmate/register';
import type {ScopeName, TextMateGrammar, ScopeNameInfo} from 'textmate/providers';

import('textmate/themes/jsight-dark.json').then((data: any) => {
  monaco.editor.defineTheme('jsight-dark', data);
  monaco.editor.setTheme('jsight-dark');
});

function initializeEditor(
  element: HTMLDivElement,
  options: monaco.editor.IStandaloneEditorConstructionOptions
) {
  return monaco.editor.create(element, options);
}

function getEditorValue(editor: any) {
  return editor.getValue();
}

function onContentChange({editor, setContent}: any) {
  const content = getEditorValue(editor);
  setContent(content);
}

// Taken from https://github.com/microsoft/vscode/blob/829230a5a83768a3494ebbc61144e7cde9105c73/src/vs/workbench/services/textMate/browser/textMateService.ts#L33-L40
async function loadVSCodeOnigurumWASM(): Promise<Response | ArrayBuffer> {
  const response = await fetch('/onig.wasm');
  const contentType = response.headers.get('content-type');
  if (contentType === 'application/wasm') {
    return response;
  }

  // Using the response directly only works if the server sets the MIME type 'application/wasm'.
  // Otherwise, a TypeError is thrown when using the streaming compiler.
  // We therefore use the non-streaming compiler :(.
  return await response.arrayBuffer();
}

export const Editor = ({content, setContent, errorRow, scrollToRow, reload}: any) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const jsightEditor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [oldRow, setOldRow] = useState<number | undefined>();
  const [decorations, setDecorations] = useState<any>();

  const languagesList = ['jsight', 'jschema', 'markdown'];
  const currentLanguage = 'jsight';

  const languages: monaco.languages.ILanguageExtensionPoint[] = languagesList.map((id) => ({
    id,
  }));

  // TODO: "source.${language} is not correct for markdown. MD scope is "text.html.markdown".
  // TODO: temporarily fixed inside grammar files
  const grammars: {[scopeName: string]: ScopeNameInfo} = languagesList.reduce(
      (grammars, language) => ({
        ...grammars,
        [`source.${language}`]: {
          language,
          path: `grammars/${language}/${language}.tmLanguage.json`,
        },
      }),
      {}
  );
  useEffect(() => {
    (async () => {
      const fetchGrammar = async (scopeName: ScopeName): Promise<TextMateGrammar> => {
        const {path} = grammars[scopeName];
        const uri = `/${path}`;
        const response = await fetch(uri);
        const grammar = await response.text();
        const type = path.endsWith('.json') ? 'json' : 'plist';
        return {type, grammar};
      };

      const fetchConfiguration = async (
        language: LanguageId
      ): Promise<monaco.languages.LanguageConfiguration> => {
        const uri = `/grammars/${language}/language-configuration.json`;
        const response = await fetch(uri);
        const rawConfiguration = await response.text();
        return rehydrateRegexps(rawConfiguration);
      };

      const data: ArrayBuffer | Response = await loadVSCodeOnigurumWASM();

      await loadWASM(data);

      const onigLib = Promise.resolve({
        createOnigScanner,
        createOnigString,
      });

      const provider = new SimpleLanguageInfoProvider({
        grammars,
        fetchGrammar,
        configurations: languages.map((language) => language.id),
        fetchConfiguration,
        theme: VsCodeDarkTheme,
        onigLib,
        monaco,
      });

      registerLanguages(
        languages,
        (language: LanguageId) => provider.fetchLanguageInfo(language),
        monaco
      );

      if (ref.current) {
        const editor = initializeEditor(ref.current, {
          value: content,
          language: currentLanguage,
          theme: 'jsight-dark',
          fontSize: 14,
          lineHeight: 21,
          fontFamily: 'JetBrainsMono',
          codeLens: false,
          smoothScrolling: true,
          scrollbar: {
            useShadows: false,
            vertical: 'visible',
            verticalHasArrows: true,
            arrowSize: 15,
          },
          contextmenu: false,
          renderLineHighlight: 'none',
          minimap: {enabled: false},
          overviewRulerLanes: 0,
          wordBasedSuggestions: false,
          padding: {
            top: 20,
            bottom: 20,
          },
          automaticLayout: true,
        });

        editor.updateOptions({
          unicodeHighlight: {ambiguousCharacters: false},
        });

        const model = editor?.getModel();

        model?.onDidChangeContent(() => onContentChange({editor, setContent}));
        model?.updateOptions({tabSize: 2});

        if (jsightEditor) {
          jsightEditor.current = editor;
        }

        provider.injectCSS();
      }

      (document as any).fonts.onloadingdone = () => monaco.editor.remeasureFonts();
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (reload && jsightEditor.current) {
      jsightEditor.current.getModel()?.setValue(content);
    }
    // eslint-disable-next-line
  }, [reload]);

  useEffect(() => {
    errorRow && jsightEditor.current?.revealLine(errorRow, 0);
    // eslint-disable-next-line
  }, [scrollToRow]);

  // process errors
  useEffect(() => {
    // Remove highlight error if there is no error
    if (oldRow && decorations) {
      const oldDecorations = jsightEditor?.current?.deltaDecorations(decorations, [
        {
          range: new monaco.Range(oldRow, 0, oldRow, 0),
          options: {},
        },
      ]);
      oldDecorations && setDecorations(oldDecorations);
    }
    // Highlight row if error exists
    if (errorRow) {
      const oldDecorations = jsightEditor?.current?.deltaDecorations(
        [],
        [
          {
            range: new monaco.Range(errorRow, 0, errorRow, 0),
            options: {
              isWholeLine: true,
              linesDecorationsClassName: 'errorLine',
              className: 'errorHoleLine',
            },
          },
        ]
      );
      oldDecorations && setDecorations(oldDecorations);
      setOldRow(errorRow);
    }
    // eslint-disable-next-line
  }, [errorRow, content]);

  return (
    <div className="editor-parent">
      <div className="editor" ref={ref} />
    </div>
  );
};
