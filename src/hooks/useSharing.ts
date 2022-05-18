import {createNewState, updateState} from 'api/codeSharing';
import {useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import clsx from 'clsx';
import {ERROR_SHARING_ID, getSharingError} from 'utils/getSharingError';
import {ToastOptions} from 'react-toastify/dist/types';
import {useContext} from 'react';
import {SharingContext} from 'store/SharingStore';
import {MainRouterParams} from 'types';

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
          history.push(`/r/${response.code}/${response.version}${path ? `#${path}` : ''}`);
        })
        .catch(() => {
          toast.warning(getSharingError, errorOptions);
          return Promise.reject('error');
        });
    }
  };

  return [createState, updateExistState];
}
