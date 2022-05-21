import {createContext} from 'react';
import {HashRouterParams} from 'types';
import {RouteComponentProps} from 'react-router-dom';

export interface SharingContextInterface extends HashRouterParams {
  history: RouteComponentProps['history'];
}

export const SharingContext = createContext({} as SharingContextInterface);
