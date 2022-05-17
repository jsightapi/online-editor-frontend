import React from 'react';
import {toast} from 'react-toastify';

export const ERROR_SHARING_ID = 2;

export const getSharingError = (
  <div className="notification-inner">
    <div className="title">API save error</div>
    <div className="message">
      An error occurred while trying to save your API. Please try again later.
    </div>
    <button className="btn-close" onClick={() => toast.dismiss(ERROR_SHARING_ID)}>
      Close
    </button>
  </div>
);
