import {FC} from 'react';
import './style.scss';

export interface CustomNotificationsProps {
  message: string | JSX.Element;
  title?: string;
  setScrollToRow: () => void;
}

export const CustomNotification: FC<CustomNotificationsProps> = ({
  message,
  title,
  setScrollToRow,
}) => {
  return (
    <div className={'notification'} onClick={setScrollToRow}>
      {title && <div className="notification-title"> {title} </div>}
      {message}
    </div>
  );
};
