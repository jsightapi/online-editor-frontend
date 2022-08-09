import React, {useContext, useMemo} from 'react';
import {RuleValueProps} from './RuleValue';
import {CodeContext} from 'components/CodeView/Code';
import clsx from 'clsx';

export const RuleValueAllOf = ({value, numberLine, type}: RuleValueProps) => {
  const {
    hiddenInheritedSchemas,
    hideInheritedSchema,
    showInheritedSchema,
    setHoveredSchema,
    hoveredSchema,
  } = useContext(CodeContext);

  const isOpen = useMemo(
    () =>
      !hiddenInheritedSchemas.find(
        (item) => item.numberLine === numberLine && item.schemaName === value
      ),
    [hiddenInheritedSchemas, numberLine, value]
  );

  const toggle: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    e.stopPropagation();

    isOpen
      ? hideInheritedSchema({numberLine, schemaName: value})
      : showInheritedSchema({numberLine, schemaName: value});
  };

  const isHovered = useMemo(
    () => value === hoveredSchema?.schemaName && numberLine === hoveredSchema.numberLine,
    [value, numberLine, hoveredSchema]
  );

  const valueClass = useMemo(
    () => clsx(['clickable-value', {expanded: isOpen}, {hovered: isHovered}]),
    [isOpen, isHovered]
  );

  return (
    <span
      onMouseEnter={() => {
        !hiddenInheritedSchemas.find((item) => item.schemaName === value) &&
          setHoveredSchema({numberLine, schemaName: value});
      }}
      onMouseLeave={() => setHoveredSchema(null)}
      onClick={toggle}
      className={clsx(valueClass, `rule-value-${type}`)}
    >
      {`"${value}"`}
    </span>
  );
};
