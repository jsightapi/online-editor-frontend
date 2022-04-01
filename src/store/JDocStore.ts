import {createContext} from 'react';
import {JDocType} from 'api/getResources.model';

export const JDocContext = createContext({} as JDocType | undefined);
