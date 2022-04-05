import React, {createContext} from 'react';

export interface SelectedLineType {
  keyBlock: string;
  numberLine: string;
}

export interface SchemaViewType {
  key: string;
  collapsedRules?: boolean;
  expandedTypes?: boolean;
  viewType?: string;
  expandDetailCard?: boolean;
}

export interface ResourceState {
  method: string;
}

export interface MainContextInterface {
  selectedLine: SelectedLineType | null;
  setSelectedLine: React.Dispatch<React.SetStateAction<SelectedLineType | null>>;
  schemasView: SchemaViewType[];
  setCollapsedRules: (key: string, value: boolean) => void;
  setExpandedTypes: (key: string, value: boolean) => void;
  setViewType: (key: string, value: string) => void;
  setExpandDetailCard: (key: string, value: boolean) => void;
  showRightSidebar: boolean;
  resourceState: ResourceState[];
  setResourceState: React.Dispatch<React.SetStateAction<ResourceState[]>>;
}

export const MainContext = createContext({} as MainContextInterface);
