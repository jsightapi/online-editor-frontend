import {runRequest} from 'utils/runRequest';
import {JDocType} from 'types/exchange';

export const baseUrlApi = process.env.REACT_APP_API_URL || `${window.location.origin}/api`;

export const getJDocExchange = (body: string) => runRequest<JDocType>(baseUrlApi, {body});
