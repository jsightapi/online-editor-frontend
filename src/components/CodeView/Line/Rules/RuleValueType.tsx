import React, {useContext, FC, useEffect, SyntheticEvent} from 'react';
import {createPortal} from 'react-dom';
import {RuleValueProps} from './RuleValue';
import {SchemaViewContext} from 'components/SchemaView';
import clsx from 'clsx';
import {ObjectContext} from '../../store/ObjectContext';
import {ShortcutLines} from '../ShortcutLines';
import {useSchemaData} from 'components/CodeView/hooks/useSchemaData';

export const RuleValueType: FC<RuleValueProps> = ({
  schemaName,
  level,
  value,
  numberLine,
  tab,
  type,
  parentNumber,
}) => {
  const {expandedTypes} = useContext(SchemaViewContext);
  const {setExpanded, expanded, objectSpanRef} = useContext(ObjectContext);
  const {setCurrentSchema} = useSchemaData({
    numberLine,
    parentNumber,
  });
  const isClickable = value.indexOf('@') === 0;

  useEffect(() => {
    if (setExpanded) {
      setExpanded(expandedTypes && value !== schemaName);
    }
  }, [expandedTypes]);

  const toggle = (e: SyntheticEvent) => {
    e.stopPropagation();
    setCurrentSchema(value);
    setExpanded && isClickable && setExpanded((prev) => !prev);
  };

  const valueClass = clsx([
    'type-value',
    isClickable && 'clickable-value',
    {expanded},
    `rule-value-${type}`,
  ]);

  return (
    <span>
      <span onClick={toggle} className={valueClass}>
        {value}
      </span>
      {objectSpanRef && objectSpanRef.current && expanded
        ? createPortal(
            <ShortcutLines
              numberLine={numberLine}
              disableOpenBracket={true}
              schemasNames={[value]}
              level={level + 1}
              tab={tab + 2}
            />,
            objectSpanRef.current
          )
        : null}
    </span>
  );
};
