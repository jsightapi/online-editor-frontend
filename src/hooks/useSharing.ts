import {createNewState, updateState} from 'api/codeSharing';
import {useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {ToastOptions} from 'react-toastify/dist/types';
import {useContext} from 'react';
import {SharingContext} from 'store/SharingStore';
import {MainRouterParams} from 'types';
import {notificationIds} from 'utils/notificationIds';
import {SharingErrorNotification} from 'components/Notifications/SharingErrorNotification';

const errorOptions: ToastOptions = {
  closeOnClick: false,
  autoClose: false,
  className: 'notification-error error',
  toastId: notificationIds.ERROR_MESSAGE_SHARING_ID,
  hideProgressBar: true,
  closeButton: true,
  draggable: false,
};

export function useSharing() {
  const {path} = useParams<MainRouterParams>();
  const {key, history} = useContext(SharingContext);

  const createState = () => {
    const content = localStorage.getItem('jsightCode');

    if (content) {
      return createNewState(content)
        .then((response) => {
          history.push(`/r/${response.code}/${response.version}${path ? `#${path}` : ''}`);
        })
        .catch(() => {
          toast.warning(SharingErrorNotification, errorOptions);
          return Promise.reject('error');
        });
    } else {
      return Promise.reject('error');
    }
  };

  const updateExistState = () => {
    const content = localStorage.getItem('jsightCode');

    if (content) {
      return updateState(key, content)
        .then((response) => {
          history.push(`/r/${response.code}/${response.version}${path ? `#${path}` : ''}`);
        })
        .catch(() => {
          toast.warning(SharingErrorNotification, errorOptions);
          return Promise.reject('error');
        });
    } else {
      return Promise.reject('error');
    }
  };

  return [createState, updateExistState];
}
