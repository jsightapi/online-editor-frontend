import {ErrorType} from 'types/error';
import {v4 as uuidv4} from 'uuid';

type requestParamsType = {
  body?: string;
  method?: string;
};

const defaultError: ErrorType = {
  Column: 0,
  Index: 0,
  Message: 'Some default error',
  Line: 0,
  Status: 'Error',
};

export const runRequest = async <T>(
  action: string,
  {body, method}: requestParamsType = {}
): Promise<T> => {
  const uuid = localStorage.getItem('uuid') || '';

  if (!uuid) {
    localStorage.setItem('uuid', uuidv4());
  }

  const headers = {
    'X-Browser-UUID': uuid,
    'Content-Type': 'text/plain',
  };

  return fetch(action, {headers, body, method: method || 'POST'}).then(async (response) => {
    if (response.ok) {
      const text = await response.text();
      try {
        const json = JSON.parse(text);
        return json;
      } catch (err) {
        return text;
      }
    } else {
      const errorResponse = await response.json();
      return Promise.reject(errorResponse || defaultError);
    }
  });
};
