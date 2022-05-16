import React from 'react';
import {CSSTransition} from 'react-transition-group';

interface DropdownMenuComponentProps {
  isOpen: boolean;
  tabIndex: number;
  role: string;
  aria: boolean;
  d_key: string;
  children?: React.ReactNode;
}

export const DropdownMenuComponent = ({
  children,
  isOpen,
  tabIndex,
  role,
  aria,
  d_key,
}: DropdownMenuComponentProps) => (
  <CSSTransition
    in={isOpen}
    appear={isOpen}
    clsx="popover"
    unmountOnExit
    timeout={{enter: 300, exit: 300}}
  >
    <div tabIndex={tabIndex} role={role} aria-hidden={aria} key={d_key}>
      {children}
    </div>
  </CSSTransition>
);
