import React, {createContext} from 'react';
import {OpenApiFormatType, SidebarDocType} from 'types';
import {HtmlDocPanelType} from 'types/htmldocpanel';

interface SidebarContextInterface {
  currentDocSidebar: SidebarDocType;
  setCurrentDocSidebar: React.Dispatch<React.SetStateAction<SidebarDocType>>;
  currentHtmlDocPanel: HtmlDocPanelType;
  setCurrentHtmlDocPanel: React.Dispatch<React.SetStateAction<HtmlDocPanelType>>;
  currentOpenApiFormat?: OpenApiFormatType;
  setCurrentOpenApiFormat?: React.Dispatch<React.SetStateAction<OpenApiFormatType>>;
}

export const SidebarContext = createContext({} as SidebarContextInterface);
