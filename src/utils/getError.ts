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
