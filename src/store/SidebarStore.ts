import React, {createContext} from 'react';
import {SidebarDocType} from 'types';

interface SidebarContextInterface {
  currentDocSidebar: SidebarDocType;
  setCurrentDocSidebar: React.Dispatch<React.SetStateAction<SidebarDocType>>;
  currentUrl: string | null;
  setCurrentUrl: React.Dispatch<React.SetStateAction<string | null>>;
  editorWidth: string | number;
  isEditor: boolean;
}

export const SidebarContext = createContext({} as SidebarContextInterface);
