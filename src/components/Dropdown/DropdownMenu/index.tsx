import React, {useContext, FC} from 'react';
import {Popper} from 'react-popper';
import clsx from 'clsx';
import {DropdownContext} from '../index';
import {DropdownMenuComponent} from '../DropdownMenuComponent';
import './DropdownMenu.styles.scss';

interface DropdownMenuProps {
  offsetY?: number;
  offsetX?: number;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({children, offsetY, offsetX}) => {
  const {isOpen} = useContext(DropdownContext);

  return (
    <Popper
      strategy="absolute"
      placement="bottom-start"
      onFirstUpdate={() => {}}
      modifiers={[
        {
          name: 'flip',
          options: {
            fallbackPlacements: ['bottom', 'right'],
          },
        },
        {
          name: 'offset',
          options: {
            offset: [offsetX || 0, offsetY || 7],
          },
        },
      ]}
    >
      {({placement, ref, style}) => (
        <div
          ref={ref}
          style={style}
          data-placement={placement}
          className={clsx(['dropdown-menu', {show: isOpen}])}
        >
          <DropdownMenuComponent
            isOpen={isOpen}
            tabIndex={-1}
            role="menu"
            aria={!isOpen}
            d_key="dropDownMenu"
          >
            {children}
          </DropdownMenuComponent>
        </div>
      )}
    </Popper>
  );
};
