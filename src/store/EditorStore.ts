import {createContext} from 'react';

interface EditorContextInterface {
  editorWidth: string | number;
  isEditor: boolean;
}

export const EditorContext = createContext({} as EditorContextInterface);
