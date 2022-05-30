import {FC, useRef} from 'react';
import Modal from 'react-modal';
import {Button} from 'components/Button';
import {toast} from 'react-toastify';
import './SharingForm.styles.scss';
import {notificationIds} from 'utils/notificationIds';

interface SharingFormProps {
  modalIsOpen: boolean;
  onClose: () => void;
}

export const SharingForm: FC<SharingFormProps> = ({modalIsOpen, onClose}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inputRef.current?.value || '');
    toast.success('Link copied', {
      toastId: notificationIds.SUCCESS_MESSAGE_DEFAULT_ID,
      position: 'bottom-center',
      className: 'notification-success success',
      autoClose: 3000,
      hideProgressBar: true,
      closeButton: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      icon: <i className="icon-check" />,
    });
  };

  const copyToClipboardAndClose = () => {
    copyToClipboard();
    onClose();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className="r-modal"
      overlayClassName="r-modal-overlay"
    >
      <div className="sharing-modal">
        <div className="d-flex header">
          <div className="title">The API was saved successfully</div>
          <button onClick={onClose} className="btn-close">
            <i className="icon-close" />
          </button>
        </div>
        <div className="description">
          Your code has been permanently saved and anyone you give this link to will be able to
          access it.
        </div>
        <div className="link">
          <label>Link</label>
          <div className="input-group">
            <input ref={inputRef} value={window.location.href.split('#')[0]} disabled />
            <div className="input-group-append">
              <button onClick={copyToClipboard}>
                <i className="icon-copy" />
              </button>
            </div>
          </div>
        </div>
        <div className="footer">
          <Button onClick={onClose} className="shadow close">
            Close
          </Button>
          <Button onClick={copyToClipboardAndClose} className="shadow copy">
            Copy & close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
