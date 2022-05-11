import {ErrorType} from 'types/error';

export const getError = (error: ErrorType) => {
  if (!error?.Line) {
    return 'Server error, try again later';
  }

  return `Error on line ${error.Line}. ${error.Message}`;
};
