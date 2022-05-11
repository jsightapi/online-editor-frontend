import {ToastOptions} from 'react-toastify/dist/types';
import {ErrorType} from 'types';
import {CustomNotification} from 'components/CustomNotification';
import {toast} from 'react-toastify';
import {getError} from 'utils/getError';
import clsx from 'clsx';

const ERROR_MESSAGE_ID = 1;

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
  const message = getError(error);
  const render = (
    <CustomNotification setScrollToRow={setScrollToRow} title={error.Status} message={message} />
  );

  if (!toast.isActive(ERROR_MESSAGE_ID)) {
    toast.warning(render, showErrorOptions);
  } else {
    toast.update(ERROR_MESSAGE_ID, {render});
  }
};
