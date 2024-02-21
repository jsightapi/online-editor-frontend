import React from 'react';
import {Dropdown} from 'components/Dropdown';
import {DropdownToggle} from 'components/Dropdown/DropdownToggle';
import {DropdownMenu} from 'components/Dropdown/DropdownMenu';
import ExternalLink from 'assets/images/icons/vector.svg';

import './DownloadMenu.styles.scss';

interface MenuType {
  name: string;
  link: string;
}

interface DocsMenuProps {
  isMenuOpened: boolean;
  setIsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DocsMenuItemsProps {
  setIsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const menu: MenuType[] = [
  {
    name: 'Quick Tutorial',
    link: 'https://jsight.io/docs/jsight-api-0-3-quick-tutorial',
  },
  {
    name: 'JSight API 0.3 Specification',
    link: 'https://jsight.io/docs/jsight-api-0-3',
  },
  {
    name: 'JSight Schema 0.3 Specification',
    link: 'https://jsight.io/docs/jsight-schema-0-3',
  },
  {
    name: 'Quick Help',
    link: 'https://jsight.io/docs/jsight-api-0-3-quick-help',
  },
];

const DownloadMenuItems = ({setIsMenuOpened}: DocsMenuItemsProps) => (
  <ul className="dropdown-items">
    {menu.map((v, key) => (
      <a
        href={v.link}
        target="_blank"
        rel="noreferrer noopener"
        key={key}
        onClick={() => setIsMenuOpened(false)}
      >
        <li>
          <span>{v.name}</span>
          <img src={ExternalLink} />
        </li>
      </a>
    ))}
  </ul>
);

export const DownloadMenu = ({isMenuOpened, setIsMenuOpened}: DocsMenuProps) => (
  <Dropdown params={{isOpen: isMenuOpened, setIsOpen: setIsMenuOpened}}>
    <DropdownToggle>
      Download <i className={isMenuOpened ? 'icon-arrow-up' : 'icon-arrow-down'} />
    </DropdownToggle>

    <DropdownMenu offsetY={15} offsetX={15} placement="bottom-end">
      <DownloadMenuItems setIsMenuOpened={setIsMenuOpened} />
    </DropdownMenu>
  </Dropdown>
);
