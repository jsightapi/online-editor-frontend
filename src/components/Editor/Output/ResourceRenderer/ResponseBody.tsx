import React from 'react';
import * as monaco from 'monaco-editor';
import {useEffect, useRef} from 'react';

const OPTIONS = {
  readOnly: true,
  language: 'json',
  fontSize: 14,
  codeLens: false,
  scrollbar: {useShadows: false, vertical: 'hidden'},
  contextmenu: false,
  renderLineHighlight: 'none',
  minimap: {enabled: false},
  overviewRulerLanes: 0,
  wordBasedSuggestions: false,
  scrollBeyondLastLine: false,
  automaticLayout: true,
};

const classes = {editor: 'h-20 overflow-hidden flex-1 bg-dark-gama w-full'};

let ignoreEvent = false;

function updateHeight({editor, container}: any) {
  const contentHeight = Math.min(1000, editor.getContentHeight());
  const contentWidth = Math.min(1000, editor.getContentWidth());
  container.style.height = `${contentHeight}px`;

  try {
    ignoreEvent = true;
    editor.layout({width: contentWidth, height: contentHeight});
  } finally {
    ignoreEvent = false;
  }
}

function initializeEditor(ref: any, options: any) {
  return monaco.editor?.create(ref, options);
}

const ResourceBody = ({content}: any) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const jsightEditor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    jsightEditor.current = initializeEditor(ref.current, {
      ...OPTIONS,
      value: content,
    });
  }, []);

  // ON CONTENT CHANGE UPDATE EDITOR VALUE
  useEffect(() => {
    const editor = jsightEditor.current;
    editor?.getModel()?.setValue(content);

    updateHeight({editor: jsightEditor.current, container: ref.current});
  }, [content]);

  return <div className={classes.editor} ref={ref} />;
};

export default ResourceBody;
