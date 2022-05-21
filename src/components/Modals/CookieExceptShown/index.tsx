import {FC, useState} from 'react';
import Modal from 'react-modal';
import './CookieExceptShown.styles.scss';

interface CookieExceptShownProps {
  onAccept: () => void;
  isOpen: boolean;
}

export const CookieExceptShown: FC<CookieExceptShownProps> = ({isOpen, onAccept}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

  const onCookieReject = () => setIsModalOpen(false);

  const goToCookiesPolicy = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log('goToCookiesPolicy');
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
          your
          <br /> device to enhance your site experience and for analytical purposes. To learn more
          about how we use the cookies, please see our{' '}
          <a onClick={goToCookiesPolicy} href="/#">
            cookies policy
          </a>
          .
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
