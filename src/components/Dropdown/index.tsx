import React, {useState, useEffect, createContext, useRef, FC} from 'react';
import {Manager} from 'react-popper';
import clsx from 'clsx';

interface DropDownParamsProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DropDownProps {
  params?: DropDownParamsProps | undefined;
}

export const DropdownContext = createContext({
  toggle: () => {},
  isOpen: false,
});

export const Dropdown: FC<DropDownProps> = ({children, params}) => {
  const [isOpen, setIsOpen] = useState<boolean>(params?.isOpen || false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    isOpen ? addEvents() : removeEvents();
    return () => removeEvents();
  }, [isOpen]);

  const addEvents = () => {
    ['click', 'touchstart'].forEach((event) =>
      document.addEventListener(event, handleDocumentClick, true)
    );
  };

  const removeEvents = () => {
    ['click', 'touchstart'].forEach((event) =>
      document.removeEventListener(event, handleDocumentClick, true)
    );
  };

  const handleDocumentClick = (e: Event) => {
    const {target} = e;
    if (containerRef.current?.contains(target as Node) && containerRef.current !== target) {
      return;
    }

    toggle();
  };

  const toggle = () => {
    setIsOpen((prev) => !prev);
    params?.setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(!!params?.isOpen);
  }, [params?.isOpen]);

  return (
    <DropdownContext.Provider value={{isOpen, toggle}}>
      <Manager>
        <div ref={containerRef} className={clsx(['dropdown', {show: isOpen}])}>
          {children}
        </div>
      </Manager>
    </DropdownContext.Provider>
  );
};
