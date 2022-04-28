import React, {FC, useState} from 'react';
import useCollapse from 'react-collapsed';
import './CollapsibleConent.scss';

interface CollapsibleContentProps {
  title: string | JSX.Element;
  rightContent?: JSX.Element;
  children?: React.ReactNode;
}

export const CollapsibleContent: FC<CollapsibleContentProps> = ({
  children,
  title,
  rightContent,
}) => {
  const [isExpanded, setExpanded] = useState(false);
  const {getCollapseProps, getToggleProps} = useCollapse({isExpanded});

  return (
    <div className="collapsible-content">
      <div className="d-flex header">
        <span
          className="flex-auto"
          {...getToggleProps({
            onClick: () => setExpanded((prevExpanded) => !prevExpanded),
          })}
        >
          <i className={isExpanded ? 'icon-arrow-down' : 'icon-arrow-right'} />
          {title}
        </span>
        {rightContent}
      </div>
      <div {...getCollapseProps()}>{children}</div>
    </div>
  );
};
