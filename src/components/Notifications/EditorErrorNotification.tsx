import React from 'react';
import './Notifications.styles.scss';

export interface CustomNotificationsProps {
  message: string | JSX.Element;
  title?: string;
  setScrollToRow?: () => void;
}

export const EditorErrorNotification = ({
  message,
  title,
  setScrollToRow,
}: CustomNotificationsProps) => (
  <div className="notification-error-inner" onClick={() => setScrollToRow && setScrollToRow()}>
    {title && <div className="title">{title}</div>}
    <div className="message">{message}</div>
  </div>
);
