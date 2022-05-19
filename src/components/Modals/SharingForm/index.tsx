import {FC} from 'react';
import Modal from 'react-modal';
import {Button} from 'components/Button';
import './SharingForm.styles.scss';

interface SharingFormProps {
  modalIsOpen: boolean;
  onClose: () => void;
}

export const SharingForm: FC<SharingFormProps> = ({modalIsOpen, onClose}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
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
          <div className="title">The API was successfully saved</div>
          <button onClick={onClose} className="btn-close">
            <i className="icon-close" />
          </button>
        </div>
        <div className="description">
          Your code has been permanently saved and may be accessed with this link by anybody you
          give it to.
        </div>
        <div className="link">
          <label>Link</label>
          <div className="input-group">
            <input value={window.location.href.split('#')[0]} disabled />
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
            Copy & Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
