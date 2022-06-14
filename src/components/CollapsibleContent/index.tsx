import React, {useMemo, useState} from 'react';
import AnimateHeight from 'react-animate-height';
import './CollapsibleConent.scss';

interface CollapsibleContentProps {
  title: string | JSX.Element;
  rightContent?: JSX.Element;
  children?: React.ReactNode;
}

export const CollapsibleContent = ({children, title, rightContent}: CollapsibleContentProps) => {
  const [height, setHeight] = useState<string | number>(0);

  const toggle = () => {
    setHeight((prev) => (prev === 0 ? 'auto' : 0));
  };

  const iconClassName = useMemo(() => (height === 0 ? 'icon-arrow-down' : 'icon-arrow-right'), [
    height,
  ]);

  return (
    <div className="collapsible-content">
      <div className="d-flex header">
        <span className="flex-auto" onClick={toggle}>
          <i className={iconClassName} />
          {title}
        </span>
        {rightContent}
      </div>
      <AnimateHeight duration={500} height={height}>
        {children}
      </AnimateHeight>
    </div>
  );
};
