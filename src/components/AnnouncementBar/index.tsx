import React from 'react';
import './AnnouncementBar.styles.scss';

interface AnnouncementBarProps {
  isShow: boolean;
  handleCloseClick(): void;
}

export const AnnouncementBar = ({isShow, handleCloseClick}: AnnouncementBarProps) => {
  if (!isShow) {
    return null;
  }

  return (
    <div className="announcement-bar d-flex" role="banner">
      <div className="content">
        ⭐ If you like JSight, give it a star on{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/jsightapi/online-editor-frontend"
        >
          GitHub
        </a>
        !&nbsp;⭐
      </div>
      <div className="btn-close" onClick={handleCloseClick}>
        <i className="icon-close" />
      </div>
    </div>
  );
};
