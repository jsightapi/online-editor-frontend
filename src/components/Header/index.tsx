import React, {useState} from 'react';
import clsx from 'clsx';
import {Button} from '../Button';
import {HeaderLogo} from './HeaderLogo';
import {DocsMenu} from './MenuItems/DocsMenu';
import {FileMenu} from './MenuItems/FileMenu';
import {useExport} from 'hooks/useExport';
import {editorModeType, ExamplesType} from 'types';
import {ShareButton} from 'components/ShareButton';
import './Header.styles.scss';
import {Example} from '../Modals/Example';
import Modal from 'react-modal';

interface HeaderProps {
  setInitialContent(content: ExamplesType): void;
  setViewMode: React.Dispatch<React.SetStateAction<editorModeType>>;
  setContactModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  openSharingModal(): void;
}

export const Header = ({
  setInitialContent,
  setViewMode,
  setContactModalVisible,
  openSharingModal,
}: HeaderProps) => {
  const [docsMenuVisible, setDocsMenuVisible] = useState<boolean>(false);
  const [fileMenuVisible, setFileMenuVisible] = useState<boolean>(false);
  const [examplePopup, setExampleMenuPopup] = useState<ExamplesType>(null);
  const switchDocsMenu = () => setDocsMenuVisible(!docsMenuVisible);
  const switchFileMenu = () => setFileMenuVisible(!fileMenuVisible);
  const [saveHtml] = useExport();

  if (examplePopup) {
    Modal.setAppElement('#root');
  }

  return (
    <div className="app-header">
      {examplePopup && (
        <Example
          initialContent={examplePopup}
          setInitialContent={setInitialContent}
          closePopup={() => setExampleMenuPopup(null)}
        />
      )}
      <div className={clsx('body', 'd-flex')}>
        <HeaderLogo />
        <ul className="menu">
          <li className="menu-switcher" onClick={switchFileMenu}>
            <FileMenu
              isMenuOpened={fileMenuVisible}
              setIsMenuOpened={setFileMenuVisible}
              setExampleMenuPopup={setExampleMenuPopup}
            />
          </li>
          <li className="menu-switcher" onClick={switchDocsMenu}>
            <DocsMenu isMenuOpened={docsMenuVisible} setIsMenuOpened={setDocsMenuVisible} />
          </li>
          <li className="menu-switcher">
            <button onClick={() => setContactModalVisible(true)}>Ask a question</button>
          </li>
        </ul>
        <div className="control-buttons">
          <Button icon="bug" onClick={() => setContactModalVisible(true)} />
          <div className="group-btn">
            <Button icon="download" onClick={saveHtml} />
            <Button icon="preview" onClick={() => setViewMode('doc')} />
          </div>
          <ShareButton openSharingModal={openSharingModal} />
        </div>
      </div>
    </div>
  );
};
