import React, {FC} from 'react';
import {Dropdown} from 'components/Dropdown';
import {DropdownToggle} from 'components/Dropdown/DropdownToggle';
import {DropdownMenu} from 'components/Dropdown/DropdownMenu';

interface FileMenuItemsProps {
  setIsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setInitialContent: (content: string) => void;
}

interface FileMenuProps extends FileMenuItemsProps {
  isMenuOpened: boolean;
}

const FileMenuItems: FC<FileMenuItemsProps> = ({setIsMenuOpened, setInitialContent}) => (
  <ul className="menu-items">
    <li
      onClick={() => {
        setIsMenuOpened(false);
        setInitialContent('cats');
      }}
    >
      <span>Reset example "Cats"</span>
    </li>
    <li
      onClick={() => {
        setIsMenuOpened(false);
        setInitialContent('dogs');
      }}
    >
      Reset example "Dogs"
    </li>
    <li
      onClick={() => {
        setIsMenuOpened(false);
        setInitialContent('pigs');
      }}
    >
      Reset example "Pigs"
    </li>
  </ul>
);

export const FileMenu: FC<FileMenuProps> = ({isMenuOpened, setIsMenuOpened, setInitialContent}) => (
  <Dropdown params={{isOpen: isMenuOpened, setIsOpen: setIsMenuOpened}}>
    <DropdownToggle>
      Examples <i className={isMenuOpened ? 'icon-arrow-up' : 'icon-arrow-down'} />
    </DropdownToggle>

    <DropdownMenu offsetY={15} offsetX={-15}>
      <FileMenuItems setIsMenuOpened={setIsMenuOpened} setInitialContent={setInitialContent} />
    </DropdownMenu>
  </Dropdown>
);
