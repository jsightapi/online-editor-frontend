import React from 'react';
import './CustomNotification.style.scss';

export interface CustomNotificationsProps {
  message: string | JSX.Element;
  title?: string;
  setScrollToRow?: () => void;
}

export const CustomNotification = ({message, title, setScrollToRow}: CustomNotificationsProps) => (
  <div className="notification-inner" onClick={() => setScrollToRow && setScrollToRow()}>
    {title && <div className="title">{title}</div>}
    <div className="message">{message}</div>
  </div>
);
