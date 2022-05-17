import {ToastOptions} from 'react-toastify/dist/types';
import {ErrorType} from 'types';
import {CustomNotification} from 'components/CustomNotification';
import {toast} from 'react-toastify';
import {getError, getErrorTitle} from 'utils/getError';
import clsx from 'clsx';

const ERROR_MESSAGE_ID = 1;

const showErrorOptions: ToastOptions = {
  closeOnClick: false,
  autoClose: false,
  className: clsx('notification-wrap', 'error'),
  toastId: ERROR_MESSAGE_ID,
  hideProgressBar: true,
  closeButton: false,
  draggable: false,
};

export const showError = (error: ErrorType, setScrollToRow: () => void) => {
  const title = getErrorTitle(error);
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
