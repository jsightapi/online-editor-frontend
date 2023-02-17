import {FC, useEffect, useState} from 'react';
import Modal from 'react-modal';
import './CustomMessage.styles.scss';

interface CustmomMessageProps {
  customMessageUrl: string;
}

interface Message {
  id: string;
  regex: string;
  content: string;
  width?: number;
}

export const CustomMessage: FC<CustmomMessageProps> = ({customMessageUrl}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allMessages, setAllMessages] = useState([] as Message[]);
  const [message, setMessage] = useState({} as Message);

  useEffect(() => {
    const getCustomMessages = async () => {
      try {
        const response = await fetch(customMessageUrl);
        const allMessages = await response.json();
        setAllMessages(allMessages);
      } catch (err) {
        throw err;
      }
    };

    getCustomMessages();
  }, [customMessageUrl]);

  useEffect(() => {
    const url = window.location.href;
    const message = allMessages.find(({regex}) => {
      const regexp = new RegExp(regex);
      return regexp.test(url);
    });

    message && setMessage(message);
  }, [allMessages]);

  useEffect(() => {
    const isShowModal = !!message.id && !Boolean(localStorage.getItem(message.id));

    setIsModalOpen(isShowModal);
  }, [message]);

  const closeModal = () => setIsModalOpen(false);

  const onCloseForever = () => {
    localStorage.setItem(message.id, 'true');
    closeModal();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className="r-modal custom-message-modal"
      overlayClassName="r-modal-overlay"
      style={{
        content: {
          width: message?.width ? `${message.width}px` : 'auto',
          minWidth: message?.width ? 'unset' : '680px',
          maxWidth: message?.width ? 'unset' : '90vw',
        },
      }}
    >
      <div className="custom-message">
        <div className="d-flex header">
          <button onClick={closeModal} className="btn-close">
            <i className="icon-close" />
          </button>
        </div>
        <div className="content" dangerouslySetInnerHTML={{__html: message.content}} />
        <div className="footer">
          <button className="close-forever" onClick={onCloseForever}>
            Close Forever
          </button>
          <button className="close-show-later" onClick={closeModal}>
            Show Later
          </button>
        </div>
      </div>
    </Modal>
  );
};
