import {ErrorType} from 'types/error';

const defaultError: ErrorType = {
  Column: 0,
  Index: 0,
  Message: 'Some default error',
  Line: 0,
  Status: 'Error',
};

export const runRequest = async <T>(
  action: string,
  {body, headers, method}: RequestInit = {}
): Promise<T> => {
  const fetchParams = {headers, body, method: method || 'POST'};

  return fetch(action, fetchParams).then(async (response) => {
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
      errorResponse.Code = response.status;
      return Promise.reject(errorResponse || defaultError);
    }
  });
};
