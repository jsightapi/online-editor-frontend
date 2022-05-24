import React from 'react';
import {toast} from 'react-toastify';
import {notificationIds} from 'utils/notificationIds';
import './Notifications.styles.scss';

export const SharingErrorNotification = (
  <div className="notification-error-inner">
    <div className="title">API save error</div>
    <div className="message">
      An error occurred while trying to save your API. Please try again later.
    </div>
    <button
      className="btn-close"
      onClick={() => toast.dismiss(notificationIds.ERROR_MESSAGE_SHARING_ID)}
    >
      Close
    </button>
  </div>
);
