import {createContext} from 'react';
import {JDocType} from 'types/exchange';

export const JDocContext = createContext({} as JDocType | undefined);
