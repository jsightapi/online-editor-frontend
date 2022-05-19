import {ErrorType} from 'types/error';

export const getErrorTitle = (error: ErrorType | undefined) => {
  const errorLine = error?.Line && error?.Line > 0 ? ` on line ${error.Line}` : '';
  return `${error?.Status || 'Error'} ${errorLine}`;
};

export const getError = (error: ErrorType) => {
  if (!error?.Line) {
    return 'Server error, try again later';
  }

  return `Error on line ${error.Line}. ${error.Message}`;
};

export const getDefaultErrorMessages = (status: number) => {
  if (status >= 400 && status < 500) {
    return "Sorry, we couldn't find the page or API you’re looking for ";
  } else if (status >= 500 && status < 600) {
    return 'Something went wrong, please try again later';
  } else {
    return 'Some default error';
  }
};
