import {ExamplesType} from 'types';
import React, {FC} from 'react';
import Modal from 'react-modal';
import './Example.styles.scss';

interface ExampleProps {
  setInitialContent: (initialContent: ExamplesType) => void;
  initialContent: ExamplesType;
  closePopup: () => void;
}

export const Example: FC<ExampleProps> = ({setInitialContent, initialContent, closePopup}) => {
  const onReset = () => {
    setInitialContent(initialContent);
    closePopup();
  };

  return (
    <Modal
      isOpen={!!initialContent}
      onRequestClose={closePopup}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className="r-modal"
      overlayClassName="r-modal-overlay"
    >
      <div className="example-modal">
        <div className="d-flex header">
          <div className="title">Reset example</div>
          <button onClick={closePopup} className="btn-close">
            <i className="icon-close" />
          </button>
        </div>
        <div className="description">
          Do you want to reset the example? Any changes or edits will be lost.
        </div>
        <div className="footer d-flex">
          <button onClick={closePopup} className="button cancel">
            Cancel
          </button>
          <button onClick={onReset} className="button reset">
            Reset
          </button>
        </div>
      </div>
    </Modal>
  );
};
