import React, {useContext, useEffect, SyntheticEvent} from 'react';
import {createPortal} from 'react-dom';
import {RuleValueProps} from './RuleValue';
import {SchemaViewContext} from 'store';
import clsx from 'clsx';
import {ObjectContext} from '../../store/ObjectContext';
import {ShortcutLines} from '../ShortcutLines';
import {useSchemaData} from 'components/CodeView/hooks/useSchemaData';
import {wrapInQuotes} from 'utils/wrapInQuotes';

export const RuleValueType = ({
  schemaName,
  level,
  value,
  numberLine,
  tab,
  type,
  parentNumber,
}: RuleValueProps) => {
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
        {wrapInQuotes(value, !['regex', 'string', 'reference'].includes(type || ''))}
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
