import React, {useContext, FC} from 'react';
import {DropdownContext} from '../index';
import {Reference} from 'react-popper';

export const DropdownToggle: FC = ({children}) => {
  const {toggle, isOpen} = useContext(DropdownContext);

  const handleClick = () => {
    toggle();
  };

  return (
    <Reference data-test="dropdown-toggle">
      {({ref}) => (
        <button onClick={handleClick} aria-expanded={isOpen} ref={ref}>
          {children}
        </button>
      )}
    </Reference>
  );
};
