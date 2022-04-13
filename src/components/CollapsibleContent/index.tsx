import React, {FC, useState} from 'react';
import {Collapse} from 'react-collapse';
import './CollapsibleConent.scss';

interface CollapsibleContentProps {
  title: string | JSX.Element;
  rightContent?: JSX.Element;
}

export const CollapsibleContent: FC<CollapsibleContentProps> = ({
  children,
  title,
  rightContent,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="collapsible-content">
      <div className="d-flex header">
        <span className="flex-auto" onClick={toggle}>
          <i className={isOpen ? 'icon-arrow-down' : 'icon-arrow-right'} />
          {title}
        </span>
        {rightContent}
      </div>
      <Collapse isOpened={isOpen}>{children}</Collapse>
    </div>
  );
};
