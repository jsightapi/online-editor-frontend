import React, {useContext, useEffect, useMemo} from 'react';
import {RuleType} from 'types/exchange';
import {createPortal} from 'react-dom';
import clsx from 'clsx';
import {ShortcutLines} from '../ShortcutLines';
import {ObjectContext} from '../../store/ObjectContext';
import {useSchemaData} from 'components/CodeView/hooks/useSchemaData';
import {SchemaViewContext} from 'store';
import {wrapInQuotes} from 'utils/wrapInQuotes';

interface RuleValueOrProps {
  items?: RuleType[];
  parentNumber?: string;
  numberLine: string;
  level: number;
  tab: number;
}

export const RuleValueOr = ({items, level, tab, numberLine, parentNumber}: RuleValueOrProps) => {
  const {setExpanded, objectSpanRef} = useContext(ObjectContext);
  const {currentSchema, setCurrentSchema} = useSchemaData({numberLine, parentNumber});

  const isTypeExist = useMemo(() => {
    return items?.find((item) => item.tokenType === 'string' && item.scalarValue);
  }, [items]);
  const {collapsedRules} = useContext(SchemaViewContext);

  useEffect(() => {
    setExpanded && setExpanded(!!currentSchema);
  }, [currentSchema]);

  const setSchema = (schemaName: string | null) => {
    setCurrentSchema(schemaName);
  };

  const renderProperties = (properties: RuleType[]) => {
    const renderEnum = (values: RuleType[]) => {
      return values.map((val, index) => (
        <span key={index.toString()}>
          <span className="value">
            {wrapInQuotes(val.scalarValue || '', val.tokenType !== 'string')}
          </span>
          {index + 1 !== values.length && <span className="punctuation-char">, </span>}
        </span>
      ));
    };

    const renderPropertyValue = (value: RuleType) => {
      if (value.key === 'type') {
        return (
          <span
            onClick={(e) => {
              e.stopPropagation();
              value.tokenType === 'reference' &&
                setSchema(value ? String(value.scalarValue) : null);
            }}
            className={clsx([
              value.tokenType === 'reference' ? 'clickable-value' : 'value',
              {expanded: currentSchema === value?.scalarValue},
            ])}
          >
            {wrapInQuotes(value.scalarValue || '')}
          </span>
        );
      } else if (value.key === 'enum' && value.tokenType === 'array' && value.children) {
        return (
          <span>
            <span>[ </span>
            {renderEnum(value.children)}
            <span> ]</span>
          </span>
        );
      } else {
        return (
          <span className="value">
            {wrapInQuotes(value.scalarValue || '', !['regex', 'string'].includes(value.key))}
          </span>
        );
      }
    };

    return (
      <span>
        <span>{'{ '}</span>
        {properties.map((value, index) => {
          return (
            value && (
              <span key={value.key}>
                <span className="name">{value.key}</span>
                <span className="punctuation-char">: </span>
                {renderPropertyValue(value)}
                {index + 1 !== properties.length && <span className="punctuation-char">, </span>}
              </span>
            )
          );
        })}
        <span>{' }'}</span>
      </span>
    );
  };

  const renderItem = (
    content: RuleType,
    index: number,
    isLastItem: boolean
  ): JSX.Element | null => {
    if (content.children) {
      return (
        <span key={index.toString()}>
          {renderProperties(content.children)}
          {!isLastItem && <span className="punctuation-char">, </span>}
        </span>
      );
    } else if (content.scalarValue) {
      return (
        <span key={index.toString()}>
          <span
            onClick={(e) => {
              e.stopPropagation();
              content.tokenType === 'reference' &&
                setSchema(content?.scalarValue ? String(content?.scalarValue) : null);
            }}
            className={clsx([
              content.tokenType === 'reference' ? 'clickable-value' : 'value',
              {expanded: currentSchema === content?.scalarValue},
            ])}
          >
            {wrapInQuotes(content?.scalarValue || '')}
          </span>
          {!isLastItem && <span className="punctuation-char">, </span>}
        </span>
      );
    } else {
      return null;
    }
  };

  if (!items) {
    return null;
  }

  return (
    <span>
      {!collapsedRules || isTypeExist ? (
        items.map((item, index) => {
          return renderItem(item, index, index === items.length - 1);
        })
      ) : (
        <span className="rules-collapsed enum">{`+${items.length}`}</span>
      )}
      {objectSpanRef && objectSpanRef.current && currentSchema
        ? createPortal(
            <ShortcutLines
              level={level + 1}
              numberLine={numberLine}
              tab={tab + 2}
              schemasNames={[currentSchema]}
              disableOpenBracket={false}
            />,
            objectSpanRef.current
          )
        : null}
    </span>
  );
};
