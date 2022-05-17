import React from 'react';
import Modal from 'react-modal';
import ContactFormFrame from 'assets/images/contact-form-frame.svg';
import './ContactForm.styles.scss';

interface ContactFormProps {
  modalIsOpen: boolean;
  onClose: () => void;
}

export const ContactForm = ({modalIsOpen, onClose}: ContactFormProps) => (
  <Modal
    isOpen={modalIsOpen}
    onRequestClose={onClose}
    shouldCloseOnOverlayClick={true}
    shouldCloseOnEsc={true}
    className="r-modal"
    overlayClassName="r-modal-overlay"
  >
    <div className="contact-modal">
      <div className="contact-modal__header">
        <h3 className="contact-modal__title">Support</h3>
        <button onClick={onClose} className="contact-modal__closeIcon">
          <i className="icon-close" />
        </button>
      </div>
      <div className="contact-modal__body">
        <p>
          Do you experience a bug or have a problem using JSight? Feel free to contact us, your
          feedback is really significant!
        </p>
        <h4>Email:</h4>
        <p>
          <a href="mailto:support@jsight.io">support@jsight.io</a>
        </p>

        <h4>Telegram:</h4>
        <p>
          <a href="https://t.me/jsight_support" target="_blank">
            @jsight_support
          </a>
        </p>
        <img src={ContactFormFrame} className="contact-modal__frame" />
      </div>
    </div>
  </Modal>
);
