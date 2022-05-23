import React, {useContext} from 'react';
import clsx from 'clsx';
import {Button} from 'components/Button';
import {useExport} from 'hooks/useExport';
import {JDocContext} from 'store';
import {editorModeType} from 'types';
import {ShareButton} from 'components/ShareButton';
interface HeaderDocProps {
  setViewMode: React.Dispatch<React.SetStateAction<editorModeType>>;
  openSharingModal(): void;
}

export const HeaderDoc = ({setViewMode, openSharingModal}: HeaderDocProps) => {
  const jdocData = useContext(JDocContext);
  const [saveHtml] = useExport();
  const title = jdocData?.info?.title;

  return (
    <div className="app-header">
      <div className={clsx('body', 'd-flex')}>
        <Button icon="arrow-back" className="black shadow" onClick={() => setViewMode('editor')}>
          Back to Editor
        </Button>
        <div className="doc-title">
          <i className="icon-preview" />
          Previewing{title ? ` — ${title}` : ''}
        </div>
        <Button icon="download" className="btn-download" onClick={saveHtml}>
          Download
        </Button>
      </div>
    </div>
  );
};
