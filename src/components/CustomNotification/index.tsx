import React from 'react';
import './style.scss';

export interface CustomNotificationsProps {
  message: string | JSX.Element;
  title?: string;
  setScrollToRow: () => void;
}

export const CustomNotification = ({message, title, setScrollToRow}: CustomNotificationsProps) => {
  return (
    <div className={'notification'} onClick={setScrollToRow}>
      {title && <div className="notification-title"> {title} </div>}
      {message}
    </div>
  );
};
