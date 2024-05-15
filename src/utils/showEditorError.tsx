import {ToastOptions} from 'react-toastify/dist/types';
import {ErrorType} from 'types';
import {toast} from 'react-toastify';
import {getError, getErrorTitle} from 'utils/getError';
import {notificationIds} from 'utils/notificationIds';
import {EditorErrorNotification} from 'components/Notifications/EditorErrorNotification';
import {IconError} from 'components/Notifications/IconError';
import {updateMessageWithUrl} from './updateMessageWithUrl';

const {ERROR_MESSAGE_DEFAULT_ID} = notificationIds;

const showErrorOptions: ToastOptions = {
  closeOnClick: false,
  autoClose: false,
  className: 'notification-error error',
  toastId: ERROR_MESSAGE_DEFAULT_ID,
  hideProgressBar: true,
  closeButton: false,
  draggable: false,
  icon: IconError,
};

export const showEditorError = (error: ErrorType, toastId: number, setScrollToRow: () => void) => {
  const title = getErrorTitle(error);
  const errorMessage = getError(error);
  const messageWithLink = updateMessageWithUrl(errorMessage);

  if (!toast.isActive(toastId)) {
    toast.warning(
      <EditorErrorNotification
        message={messageWithLink}
        title={title}
        setScrollToRow={setScrollToRow}
      />,
      {...showErrorOptions, toastId}
    );
  } else {
    toast.update(toastId, {
      render: (
        <EditorErrorNotification
          message={messageWithLink}
          title={title}
          setScrollToRow={setScrollToRow}
        />
      ),
    });
  }
};
