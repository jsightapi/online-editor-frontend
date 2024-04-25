import React, {useCallback, useEffect, useRef} from 'react';
import './Notifications.styles.scss';

export interface CustomNotificationsProps {
  message: string;
  title?: string;
  setScrollToRow?: () => void;
}

export const EditorErrorNotification = ({
  message,
  title,
  setScrollToRow,
}: CustomNotificationsProps) => {
  const notificationRef = useRef<HTMLDivElement | null>(null);

  const handleNotificationClick = useCallback(() => {
    setScrollToRow && setScrollToRow();
  }, []);

  useEffect(() => {
    const notificationElement = notificationRef.current?.closest<HTMLDivElement>(
      '.notification-error'
    );

    ['click', 'touchstart'].forEach((event) =>
      notificationElement?.addEventListener(event, handleNotificationClick, true)
    );

    return () => {
      ['click', 'touchstart'].forEach((event) =>
        notificationElement?.removeEventListener(event, handleNotificationClick, true)
      );
    };
  }, [handleNotificationClick]);

  return (
    <div ref={notificationRef} className="notification-error-inner">
      {title && <div className="title">{title}</div>}
      <div className="message" dangerouslySetInnerHTML={{__html: message}} />
    </div>
  );
};
