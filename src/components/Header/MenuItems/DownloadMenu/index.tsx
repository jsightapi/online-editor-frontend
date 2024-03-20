import React from 'react';
import {Dropdown} from 'components/Dropdown';
import {DropdownToggle} from 'components/Dropdown/DropdownToggle';
import {DropdownMenu} from 'components/Dropdown/DropdownMenu';

import IconOpenAPI from 'assets/images/icons/openapi.svg';
import IconHTMLDoc from 'assets/images/icons/htmldoc.svg';

import './DownloadMenu.styles.scss';
import {useExport} from 'hooks/useExport';

interface MenuType {
  icon: string;
  name: string;
  desc: string;
  action: () => Promise<void>;
}

interface DocsMenuProps {
  isMenuOpened: boolean;
  setIsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DocsMenuItemsProps {
  setIsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DownloadMenu = ({isMenuOpened, setIsMenuOpened}: DocsMenuProps) => {
  const {saveHtml, saveJson, saveYaml} = useExport();

  const menu: MenuType[] = [
    {
      icon: IconHTMLDoc,
      name: 'HTML page',
      desc: 'Download the prettified documentation page',
      action: saveHtml,
    },
    {
      icon: IconOpenAPI,
      name: 'OpenAPI JSON',
      desc: 'Download the converted OpenAPI JSON code',
      action: saveJson,
    },
    {
      icon: IconOpenAPI,
      name: 'OpenAPI YAML',
      desc: 'Download the converted OpenAPI YAML code',
      action: saveYaml,
    },
  ];

  const DownloadMenuItems = ({setIsMenuOpened}: DocsMenuItemsProps) => (
    <ul className="dropdown-items">
      {menu.map((v, key) => (
        <div
          key={key}
          onClick={() => {
            v.action();
            setIsMenuOpened(false);
          }}
        >
          <li className="item">
            <img className="icon" src={v.icon} />
            <div className="info">
              <div className="name">{v.name}</div>
              <div className="desc">{v.desc}</div>
            </div>
          </li>
        </div>
      ))}
    </ul>
  );

  return (
    <Dropdown params={{isOpen: isMenuOpened, setIsOpen: setIsMenuOpened}}>
      <DropdownToggle>
        Download <i className={isMenuOpened ? 'icon-arrow-up' : 'icon-arrow-down'} />
      </DropdownToggle>

      <DropdownMenu offsetY={15} offsetX={15} placement="bottom-end">
        <DownloadMenuItems setIsMenuOpened={setIsMenuOpened} />
      </DropdownMenu>
    </Dropdown>
  );
};
