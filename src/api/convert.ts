import {runRequest} from 'utils/runRequest';
import {v4 as uuidv4} from 'uuid';

const url = `https://dev.editor.jsight.io/convert-jsight`;

export const convert = (jsightCode = '', format: string) => {
  const uuid = localStorage.getItem('uuid') || '';

  if (!uuid) {
    localStorage.setItem('uuid', uuidv4());
  }

  const headers = {
    'X-Browser-UUID': uuid,
    'Content-Type': 'text/plain',
  };

  const body = JSON.stringify(jsightCode);

  return runRequest<string>(
    `${url}?to=openapi-3.0.3&format=${format}`,
    {body, headers},
    {responseAsText: true}
  );
};
