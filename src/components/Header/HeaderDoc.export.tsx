import React, {FC, useContext} from 'react';
import clsx from 'clsx';
import {Button} from 'components/Button';
import {useExport} from 'hooks/useExport';
import {JDocContext} from 'store';
import {editorModeType} from 'types';

interface HeaderDocProps {
  setViewMode: React.Dispatch<React.SetStateAction<editorModeType>>;
}

export const HeaderDoc: FC<HeaderDocProps> = ({setViewMode}) => {
  const jdocData = useContext(JDocContext);
  const [saveHtml] = useExport();

  return (
    <div className="app-header">
      <div className={clsx('body', 'd-flex')}>
        <Button icon="arrow-back" className="black shadow" onClick={() => setViewMode('editor')}>
          Back to Editor
        </Button>
        <div className="doc-title">
          <i className="icon-preview" />
          Previewing — {jdocData?.info?.title}
        </div>
        <Button icon="download" className="shadow" onClick={saveHtml}>
          Download
        </Button>
      </div>
    </div>
  );
};
