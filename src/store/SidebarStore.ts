import React, {createContext} from 'react';
import {SidebarDocType} from 'types';

interface SidebarContextInterface {
  currentDocSidebar: SidebarDocType;
  setCurrentDocSidebar: React.Dispatch<React.SetStateAction<SidebarDocType>>;
}

export const SidebarContext = createContext({} as SidebarContextInterface);
