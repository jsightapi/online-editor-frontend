import {createNewState, updateState} from 'api/codeSharing';
import {useHistory, useParams} from 'react-router-dom';
import {MainRouterParams} from 'types';
import {toast} from 'react-toastify';
import clsx from 'clsx';
import {ERROR_SHARING_ID, getSharingError} from 'utils/getSharingError';
import {ToastOptions} from 'react-toastify/dist/types';

const errorOptions: ToastOptions = {
  closeOnClick: false,
  autoClose: false,
  className: clsx('notification-wrap', 'error'),
  toastId: ERROR_SHARING_ID,
  hideProgressBar: true,
  closeButton: true,
  draggable: false,
};

export function useSharing() {
  const history = useHistory();
  const {key} = useParams<MainRouterParams>();

  const createState = () => {
    const content = localStorage.getItem('jsightCode');

    if (content) {
      return createNewState(content)
        .then((response) => {
          history.push(`/r/${response.code}/${response.version}`);
        })
        .catch(() => {
          toast.warning(getSharingError, errorOptions);
          return Promise.reject('error');
        });
    }
  };

  const updateExistState = () => {
    const content = localStorage.getItem('jsightCode');

    if (content) {
      updateState(key, content)
        .then((response) => {
          history.push(`/r/${response.code}/${response.version}`);
        })
        .catch(() => {
          toast.warning(getSharingError, errorOptions);
          return Promise.reject('error');
        });
    }
  };

  return [createState, updateExistState];
}
