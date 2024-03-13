import {createContext} from 'react';
import {JDocType} from 'types/exchange';

export interface JDocContextType {
  jdocExchange: JDocType | undefined;
  jsightCode: string;
}

export const JDocContext = createContext({} as JDocContextType);
