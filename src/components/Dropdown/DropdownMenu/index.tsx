import React, {useContext} from 'react';
import {Popper} from 'react-popper';
import {Placement} from '@popperjs/core/lib';
import clsx from 'clsx';
import {DropdownContext} from '../index';
import {DropdownMenuComponent} from '../DropdownMenuComponent';
import './DropdownMenu.styles.scss';

interface DropdownMenuProps {
  offsetY?: number;
  offsetX?: number;
  children?: React.ReactNode;
  placement?: Placement;
}

export const DropdownMenu = ({
  children,
  offsetY,
  offsetX,
  placement = 'bottom-start',
}: DropdownMenuProps) => {
  const {isOpen} = useContext(DropdownContext);

  return (
    <Popper
      strategy="absolute"
      placement={placement}
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
