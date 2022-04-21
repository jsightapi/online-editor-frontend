import React, {createContext} from 'react';
import {SchemaData} from 'components/CodeView/Code';

export interface SelectedLineType {
  keyBlock: string;
  numberLine: string;
}

export interface SchemaViewType {
  key: string;
  typeBlock?: string;
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
  setTypeBlock: (key: string, value: string | undefined) => void;
  setSchemasData: React.Dispatch<React.SetStateAction<{[key: string]: SchemaData[]}>>;
  schemasData: {[key: string]: SchemaData[]};
  showRightSidebar: boolean;
  resourceState: ResourceState[];
  setResourceState: React.Dispatch<React.SetStateAction<ResourceState[]>>;
}

export const MainContext = createContext({} as MainContextInterface);
