import {runRequest} from 'utils/runRequest';
import {v4 as uuidv4} from 'uuid';
import {convertJsightUrl} from './baseUrl';

export const convert = (body = '', format: string) => {
  const uuid = localStorage.getItem('uuid') || '';

  if (!uuid) {
    localStorage.setItem('uuid', uuidv4());
  }

  const headers = {
    'X-Browser-UUID': uuid,
    'Content-Type': 'text/plain',
  };

  return runRequest<string>(
    `${convertJsightUrl}?to=openapi-3.0.3&format=${format}`,
    {body, headers},
    {responseAsText: true}
  );
};
