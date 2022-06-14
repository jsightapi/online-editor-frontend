import React from 'react';
import Modal from 'react-modal';
import ContactFormFrame from 'assets/images/contact-form-frame.svg';
import './Contacts.styles.scss';

interface ContactFormProps {
  modalIsOpen: boolean;
  onClose: () => void;
}

export const Contacts = ({modalIsOpen, onClose}: ContactFormProps) => (
  <Modal
    isOpen={modalIsOpen}
    onRequestClose={onClose}
    shouldCloseOnOverlayClick={true}
    shouldCloseOnEsc={true}
    className="r-modal"
    overlayClassName="r-modal-overlay"
  >
    <div className="contact-modal">
      <div className="header d-flex">
        <h3 className="title">Support</h3>
        <button onClick={onClose} className="close-btn">
          <i className="icon-close" />
        </button>
      </div>
      <div className="description">
        Do you experience a bug or have a problem using JSight? Feel free to contact us, your
        feedback is really significant!
      </div>
      <div className="contacts d-flex">
        <div>
          <div className="label">Email:</div>
          <div className="value">
            <a href="mailto:support@jsight.io">support@jsight.io</a>
          </div>
        </div>
        <div>
          <div className="label">Telegram:</div>
          <div className="value">
            <a href="https://t.me/jsight_support" target="_blank">
              @jsight_support
            </a>
          </div>
        </div>
      </div>
      <img src={ContactFormFrame} className="image" />
    </div>
  </Modal>
);
