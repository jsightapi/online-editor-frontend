import React from 'react';
import {Dropdown} from 'components/Dropdown';
import {DropdownToggle} from 'components/Dropdown/DropdownToggle';
import {DropdownMenu} from 'components/Dropdown/DropdownMenu';
import {ExamplesType} from 'types';

interface FileMenuItemsProps {
  setIsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setExampleMenuPopup: (content: ExamplesType) => void;
}

interface FileMenuProps extends FileMenuItemsProps {
  isMenuOpened: boolean;
}

const FileMenuItems = ({setIsMenuOpened, setExampleMenuPopup}: FileMenuItemsProps) => (
  <ul className="dropdown-items">
    <li
      onClick={() => {
        setIsMenuOpened(false);
        setExampleMenuPopup('cats');
      }}
    >
      <span>Reset example "Cats"</span>
    </li>
    <li
      onClick={() => {
        setIsMenuOpened(false);
        setExampleMenuPopup('dogs');
      }}
    >
      Reset example "Dogs"
    </li>
    <li
      onClick={() => {
        setIsMenuOpened(false);
        setExampleMenuPopup('pigs');
      }}
    >
      Reset example "Pigs"
    </li>
    <li
      onClick={() => {
        setIsMenuOpened(false);
        setExampleMenuPopup('json-rpc');
      }}
    >
      Reset JSON-RPC example
    </li>
  </ul>
);

export const FileMenu = ({isMenuOpened, setIsMenuOpened, setExampleMenuPopup}: FileMenuProps) => (
  <Dropdown params={{isOpen: isMenuOpened, setIsOpen: setIsMenuOpened}}>
    <DropdownToggle>
      Examples <i className={isMenuOpened ? 'icon-arrow-up' : 'icon-arrow-down'} />
    </DropdownToggle>

    <DropdownMenu offsetY={15} offsetX={-15}>
      <FileMenuItems setIsMenuOpened={setIsMenuOpened} setExampleMenuPopup={setExampleMenuPopup} />
    </DropdownMenu>
  </Dropdown>
);
