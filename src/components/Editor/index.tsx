import React, {useState, useEffect, useRef} from 'react';
import * as monaco from 'monaco-editor';
import {createOnigScanner, createOnigString, loadWASM} from 'vscode-oniguruma';
import {SimpleLanguageInfoProvider} from 'textmate/providers';
import {registerLanguages} from 'textmate/register';
import {rehydrateRegexps} from 'textmate/configuration';
import VsCodeDarkTheme from 'textmate/themes/vs-dark-plus-theme';
import type {LanguageId} from 'textmate/register';
import type {ScopeName, TextMateGrammar, ScopeNameInfo} from 'textmate/providers';
import './Editor.styles.scss';

import('textmate/themes/jsight-dark.json').then((data: any) => {
  monaco.editor.defineTheme('jsight-dark', data);
  monaco.editor.setTheme('jsight-dark');
});

interface EditorProps {
  content: string;
  setContent?: (value: string) => void;
  errorRow?: number | null;
  scrollToRow?: boolean;
  reload?: boolean;
  reloadedEditor?: () => void;
  readOnly?: boolean;
  currentTheme?: string;
  globalTestId?: string;
}

function initializeEditor(
  element: HTMLDivElement,
  options: monaco.editor.IStandaloneEditorConstructionOptions
) {
  return monaco.editor.create(element, options);
}

function getEditorValue(editor: any) {
  return editor.getValue();
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

export const Editor = React.memo(
  ({
    content,
    setContent,
    errorRow,
    scrollToRow,
    reload,
    reloadedEditor,
    readOnly = false,
    globalTestId,
  }: EditorProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const jsightEditor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const decorationsRef = useRef<string[]>([]);
    const [isEditorLoaded, setIsEditorLoaded] = useState<boolean>(false);
    const languagesList = ['jsight', 'jschema', 'markdown'];
    const currentLanguage = 'jsight';

    if (globalTestId !== undefined) {
      // @ts-ignore
      window[globalTestId] = jsightEditor;
    }

    const languages: monaco.languages.ILanguageExtensionPoint[] = languagesList.map((id) => ({
      id,
    }));

    const onContentChange = (editor: monaco.editor.IStandaloneCodeEditor) => {
      const content = getEditorValue(editor);
      setContent && setContent(content);
    };

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
              verticalHasArrows: false,
              horizontalHasArrows: false,
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
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
            readOnly,
          });

          const model = editor?.getModel();

          model?.onDidChangeContent(() => onContentChange(editor));
          model?.updateOptions({tabSize: 2});

          if (jsightEditor) {
            jsightEditor.current = editor;
          }

          provider.injectCSS();

          setIsEditorLoaded(true);
        }

        (document as any).fonts.onloadingdone = () => {
          monaco.editor.remeasureFonts();
        };
      })();
      // eslint-disable-next-line
    }, []);

    // process errors
    useEffect(() => {
      if (isEditorLoaded) {
        highlightError();
      }
      // eslint-disable-next-line
    }, [isEditorLoaded, errorRow, content]);

    useEffect(() => {
      if (reload && isEditorLoaded) {
        jsightEditor.current?.setValue(content);
        reloadedEditor && reloadedEditor();
      }
      // eslint-disable-next-line
    }, [isEditorLoaded, reload]);

    useEffect(() => {
      errorRow && jsightEditor.current?.revealLine(errorRow, 0);
      // eslint-disable-next-line
    }, [scrollToRow]);

    const highlightError = () => {
      if (jsightEditor.current) {
        if (errorRow) {
          decorationsRef.current = jsightEditor.current.deltaDecorations(decorationsRef.current, [
            {
              range: new monaco.Range(errorRow, 0, errorRow, 0),
              options: {
                isWholeLine: true,
                linesDecorationsClassName: 'errorLine',
                className: 'errorHoleLine',
              },
            },
          ]);
        } else {
          decorationsRef.current = jsightEditor.current.deltaDecorations(
            decorationsRef.current,
            []
          );
        }
      }
    };

    return (
      <div className="editor-parent">
        <div className="editor" ref={ref} />
      </div>
    );
  }
);
