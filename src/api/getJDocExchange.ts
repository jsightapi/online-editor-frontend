import {runRequest} from 'utils/runRequest';
import {JDocType} from './getResources.model';

const baseUrl = process.env.REACT_APP_API_URL || `${window.location.origin}/api`;

export const getJDocExchange = (body: string) => runRequest<JDocType>(baseUrl, {body});
