import React, {useContext, useState} from 'react';
import clsx from 'clsx';
import {Button} from '../Button';
import {HeaderLogo} from './HeaderLogo';
import {DocsMenu} from './MenuItems/DocsMenu';
import {FileMenu} from './MenuItems/FileMenu';
import {editorModeType, ExamplesType} from 'types';
import {ShareButton} from 'components/ShareButton';
import {Example} from '../Modals/Example';
import Modal from 'react-modal';
import {Toggle} from 'components/Toggle';
import {DownloadMenu} from './MenuItems/DownloadMenu';
import {SidebarContext} from 'store';

import './Header.styles.scss';

interface HeaderProps {
  setInitialContent(content: ExamplesType): void;
  setViewMode: React.Dispatch<React.SetStateAction<editorModeType>>;
  setContactModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  openSharingModal(): void;
  disableSharing: boolean;
}

export const Header = ({
  setInitialContent,
  setViewMode,
  setContactModalVisible,
  openSharingModal,
  disableSharing,
}: HeaderProps) => {
  const [docsMenuVisible, setDocsMenuVisible] = useState<boolean>(false);
  const [fileMenuVisible, setFileMenuVisible] = useState<boolean>(false);
  const [downloadMenuVisible, setDownloadMenuVisible] = useState<boolean>(false);
  const [examplePopup, setExampleMenuPopup] = useState<ExamplesType>(null);

  const {currentDocSidebar, currentOpenApiFormat, setCurrentOpenApiFormat} = useContext(
    SidebarContext
  );

  const switchDocsMenu = () => setDocsMenuVisible(!docsMenuVisible);
  const switchFileMenu = () => setFileMenuVisible(!fileMenuVisible);
  const switchDownloadMenu = () => setDownloadMenuVisible(!downloadMenuVisible);

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
          <li className="item" onClick={switchFileMenu}>
            <FileMenu
              isMenuOpened={fileMenuVisible}
              setIsMenuOpened={setFileMenuVisible}
              setExampleMenuPopup={setExampleMenuPopup}
            />
          </li>
          <li className="item" onClick={switchDocsMenu}>
            <DocsMenu isMenuOpened={docsMenuVisible} setIsMenuOpened={setDocsMenuVisible} />
          </li>
          <li className="item">
            <button>
              <a
                href="https://jsight.io/products/jsight-validator/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Message validator
              </a>
            </button>
          </li>
          <li className="item">
            <button>OpenAPI</button>
          </li>
          <li className="item">
            <button onClick={() => setContactModalVisible(true)}>Ask a question</button>
          </li>
        </ul>
        <div className="control-buttons">
          {currentDocSidebar === 'openapi' && (
            <Toggle
              leftOption="JSON"
              rightOption="YAML"
              defaultOption={currentOpenApiFormat === 'yaml' ? 'YAML' : 'JSON'}
              isEquivalent={true}
              onChange={(value: boolean) =>
                setCurrentOpenApiFormat && setCurrentOpenApiFormat(value ? 'yaml' : 'json')
              }
            />
          )}
          <Button title="Report a bug" icon="bug" onClick={() => setContactModalVisible(true)} />
          <div className="group-btn">
            <Button title="HTML Preview" icon="preview" onClick={() => setViewMode('doc')}>
              HTML Preview
            </Button>
            <Button title="Download" icon="download" onClick={switchDownloadMenu}>
              <DownloadMenu
                isMenuOpened={downloadMenuVisible}
                setIsMenuOpened={setDownloadMenuVisible}
              />
            </Button>
          </div>
          <ShareButton disableSharing={disableSharing} openSharingModal={openSharingModal} />
        </div>
      </div>
    </div>
  );
};
