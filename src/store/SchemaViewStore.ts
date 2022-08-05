import {createContext} from 'react';

interface SchemaViewContextInterface {
  collapsedRules: boolean;
  expandedTypes: boolean;
  viewType: string;
}

export const SchemaViewContext = createContext({} as SchemaViewContextInterface);
