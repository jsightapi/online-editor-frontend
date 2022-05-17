import {runRequest} from 'utils/runRequest';
import {JDocType} from 'types/exchange';
import {v4 as uuidv4} from 'uuid';

export const baseUrlApi = process.env.REACT_APP_API_URL || `${window.location.origin}/api`;

export const getJDocExchange = (body: string) => {
  const uuid = localStorage.getItem('uuid') || '';

  if (!uuid) {
    localStorage.setItem('uuid', uuidv4());
  }

  const headers = {
    'X-Browser-UUID': uuid,
    'Content-Type': 'text/plain',
  };

  return runRequest<JDocType>(baseUrlApi, {body, headers});
};
