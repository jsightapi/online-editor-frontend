import React, {createContext} from 'react';
import {OpenApiFormatType, SidebarDocType} from 'types';

interface SidebarContextInterface {
  currentOpenApiFormat: OpenApiFormatType;
  setCurrentOpenApiFormat: React.Dispatch<React.SetStateAction<OpenApiFormatType>>;
  currentDocSidebar: SidebarDocType;
  setCurrentDocSidebar: React.Dispatch<React.SetStateAction<SidebarDocType>>;
}

export const SidebarContext = createContext({} as SidebarContextInterface);
