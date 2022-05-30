import {ErrorType} from 'types/error';

const defaultError: ErrorType = {
  Column: 0,
  Index: 0,
  Message: '',
  Line: 0,
  Status: 'Error',
};

export const runRequest = async <T>(
  action: string,
  {body, headers, method}: RequestInit = {},
  timeout = 0,
  times = 0
): Promise<T> => {
  const fetchParams: RequestInit = {headers, body, method: method || 'POST'};

  let id: any;
  if (timeout > 0) {
    const controller = new AbortController();
    id = setTimeout(() => controller.abort(), timeout);

    fetchParams.signal = controller.signal;
  }

  if (times > timeout / 1000) {
    return Promise.reject(defaultError);
  }

  if (!window.navigator.onLine && timeout > 0) {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve(runRequest(action, fetchParams, timeout, times + 1));
      }, 1000);
    });
  }

  const response = fetch(action, fetchParams).then(async (response) => {
    if (response.ok) {
      const text = await response.text();
      try {
        const json = JSON.parse(text);
        return json;
      } catch (err) {
        return text;
      }
    } else {
      try {
        const errorResponse = await response.json();
        errorResponse.Code = response.status;
        return Promise.reject(errorResponse || defaultError);
      } catch {
        return Promise.reject({
          Code: response.status,
          ...defaultError,
        });
      }
    }
  });

  if (id) {
    clearTimeout(id);
  }

  return response;
};
