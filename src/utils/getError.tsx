import {ErrorType} from 'types/error';
import {toast} from 'react-toastify';
import {ToastOptions} from 'react-toastify/dist/types';
import {CustomNotification} from 'components/CustomNotification';
import clsx from 'clsx';
import 'components/CustomNotification/style.scss';

const ERROR_MESSAGE_ID = 1;

export const getError = (error: ErrorType) => {
  if (!error?.Line) {
    return 'Server error, try again later';
  }

  const errorMessage = error.Message;
  return errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
};

const getTitle = (error: ErrorType | undefined) => {
  const errorLine = error?.Line && error?.Line > 0 ? ` on line ${error.Line}` : '';
  return `${error?.Status || 'Error'} ${errorLine}`;
};

const showErrorOptions: ToastOptions = {
  type: 'warning',
  closeOnClick: false,
  autoClose: false,
  className: clsx('notification-wrap', 'error-notification'),
  toastId: ERROR_MESSAGE_ID,
  hideProgressBar: true,
  closeButton: false,
  draggable: false,
};

export const showError = (error: ErrorType, setScrollToRow: () => void) => {
  const title = getTitle(error);
  const message = getError(error);

  const render = (
    <CustomNotification setScrollToRow={setScrollToRow} title={title} message={message} />
  );

  if (!toast.isActive(ERROR_MESSAGE_ID)) {
    toast.warning(render, showErrorOptions);
  } else {
    toast.update(ERROR_MESSAGE_ID, {render});
  }
};
