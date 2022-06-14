import {ToastOptions} from 'react-toastify/dist/types';
import {ErrorType} from 'types';
import {toast} from 'react-toastify';
import {getError, getErrorTitle} from 'utils/getError';
import {notificationIds} from 'utils/notificationIds';
import {EditorErrorNotification} from 'components/Notifications/EditorErrorNotification';

const {ERROR_MESSAGE_DEFAULT_ID} = notificationIds;

const showErrorOptions: ToastOptions = {
  closeOnClick: false,
  autoClose: false,
  className: 'notification-error error',
  toastId: ERROR_MESSAGE_DEFAULT_ID,
  hideProgressBar: true,
  closeButton: false,
  draggable: false,
};

export const showEditorError = (error: ErrorType, setScrollToRow: () => void) => {
  const title = getErrorTitle(error);
  const message = getError(error);

  const render = (
    <EditorErrorNotification setScrollToRow={setScrollToRow} title={title} message={message} />
  );

  if (!toast.isActive(ERROR_MESSAGE_DEFAULT_ID)) {
    toast.warning(render, showErrorOptions);
  } else {
    toast.update(ERROR_MESSAGE_DEFAULT_ID, {render});
  }
};
