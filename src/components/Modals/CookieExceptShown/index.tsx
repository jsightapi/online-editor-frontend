import {FC, useState} from 'react';
import Modal from 'react-modal';
import './CookieExceptShown.styles.scss';

interface CookieExceptShownProps {
  onClose: () => void;
  isOpen: boolean;
}

export const CookieExceptShown: FC<CookieExceptShownProps> = ({isOpen, onClose}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

  const closeCookieExceptModal = () => {
    onClose();
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
          <button onClick={closeCookieExceptModal} className="btn-close">
            <i className="icon-close" />
          </button>
        </div>
        <div className="description">
          By continuing to browse or by clicking ‘Accept’, you agree to the storing of cookies on
          your
          <br /> device to enhance your site experience and for analytical purposes. To learn more
          about how we use the cookies, please see our cookies policy.
        </div>
      </div>
    </Modal>
  );
};
