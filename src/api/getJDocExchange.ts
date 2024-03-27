import {runRequest} from 'utils/runRequest';
import {JDocType} from 'types/exchange';
import {v4 as uuidv4} from 'uuid';
import {convertJsightUrl} from './baseUrl';

export const getJDocExchange = (body: string) => {
  const uuid = localStorage.getItem('uuid') || '';

  if (!uuid) {
    localStorage.setItem('uuid', uuidv4());
  }

  const headers = {
    'X-Browser-UUID': uuid,
    'Content-Type': 'text/plain',
  };

  return runRequest<JDocType>(`${convertJsightUrl}?to=jdoc-2.0`, {body, headers});
};
