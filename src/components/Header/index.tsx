import React, {useState} from 'react';
import clsx from 'clsx';
import {Button} from '../Button';
import {HeaderLogo} from './HeaderLogo';
import {DocsMenu} from './MenuItems/DocsMenu';
import {FileMenu} from './MenuItems/FileMenu';
import './Header.styles.scss';
import {useExport} from 'hooks/useExport';
import {editorModeType} from 'types';

interface HeaderProps {
  setInitialContent(content: string): void;
  setViewMode: React.Dispatch<React.SetStateAction<editorModeType>>;
  setContactModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({setInitialContent, setViewMode, setContactModalVisible}: HeaderProps) => {
  const [docsMenuVisible, setDocsMenuVisible] = useState<boolean>(false);
  const [fileMenuVisible, setFileMenuVisible] = useState<boolean>(false);
  const switchDocsMenu = () => setDocsMenuVisible(!docsMenuVisible);
  const switchFileMenu = () => setFileMenuVisible(!fileMenuVisible);
  const [saveHtml] = useExport();

  return (
    <div className="app-header">
      <div className={clsx('body', 'd-flex')}>
        <HeaderLogo />
        <ul className="menu">
          <li className="menu-switcher" onClick={switchFileMenu}>
            <FileMenu
              isMenuOpened={fileMenuVisible}
              setIsMenuOpened={setFileMenuVisible}
              setInitialContent={setInitialContent}
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
          <Button icon="bug" className="shadow" onClick={() => setContactModalVisible(true)}>
            Report a bug
          </Button>
          <div className="delimiter" />
          <Button icon="download" className="shadow" onClick={saveHtml}>
            Export
          </Button>
          <Button icon="preview" className="shadow" onClick={() => setViewMode('doc')}>
            Preview
          </Button>
        </div>
      </div>
    </div>
  );
};
