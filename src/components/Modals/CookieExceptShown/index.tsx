import {FC, useState} from 'react';
import Modal from 'react-modal';
import './CookieExceptShown.styles.scss';

interface CookieExceptShownProps {
  onAccept: () => void;
}

export const CookieExceptShown: FC<CookieExceptShownProps> = ({onAccept}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const onCookieReject = () => setIsModalOpen(false);

  const goToCookiesPolicy = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    /** TODO implement this method later (when the cookie policy window will be ready)*/
  };

  const onCookiePolicyAccept = () => {
    onAccept();
    setIsModalOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className="r-modal cookie-except-modal"
      overlayClassName="r-modal-overlay"
    >
      <div className="cookie-except">
        <div className="d-flex header">
          <div className="title">🍪 Cookie Consent</div>
          <button onClick={onCookieReject} className="btn-close">
            <i className="icon-close" />
          </button>
        </div>
        <div className="description">
          By continuing to browse or by clicking ‘Accept’, you agree to the storing of cookies on
          your device to enhance your site experience and for analytical purposes.
        </div>
        <div className="footer">
          <button className="accept-button" onClick={onCookiePolicyAccept}>
            Accept
          </button>
        </div>
      </div>
    </Modal>
  );
};
