import React, {useContext, useEffect, useMemo} from 'react';
import {SchemaJSightContentType} from 'api/getResources.model';
import {map} from 'lodash';
import {createPortal} from 'react-dom';
import clsx from 'clsx';
import {ShortcutLines} from '../ShortcutLines';
import {ObjectContext} from '../../store/ObjectContext';
import {useSchemaData} from 'components/CodeView/hooks/useSchemaData';
import {SchemaViewContext} from 'components/SchemaView';

interface RuleValueOrProps {
  items?: SchemaJSightContentType[];
  parentNumber?: string;
  numberLine: string;
  level: number;
  tab: number;
}

export const RuleValueOr = ({items, level, tab, numberLine, parentNumber}: RuleValueOrProps) => {
  const {setExpanded, objectSpanRef} = useContext(ObjectContext);
  const {currentSchema, setCurrentSchema} = useSchemaData({numberLine, parentNumber});

  const isTypeExist = useMemo(() => {
    return items?.find((item) => item.jsonType === 'string' && item.scalarValue);
  }, [items]);
  const {collapsedRules} = useContext(SchemaViewContext);

  useEffect(() => {
    setExpanded && setExpanded(!!currentSchema);
  }, [currentSchema]);

  const setSchema = (schemaName: string | null) => {
    setCurrentSchema(schemaName);
  };

  const renderProperties = (properties: {[key: string]: SchemaJSightContentType | undefined}) => {
    let index = 0;

    return (
      <span>
        <span>{'{ '}</span>
        {map(properties, (value, key) => {
          index++;
          return (
            value && (
              <span key={key}>
                <span className="name">{key}</span>
                <span className="punctuation-char">: </span>
                {key === 'type' ? (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      (value.scalarValue as string)[0] === '@' &&
                        setSchema(value ? String(value.scalarValue) : null);
                    }}
                    className={clsx([
                      (value.scalarValue as string)[0] === '@' ? 'clickable-value' : 'value',
                      {expanded: currentSchema === value?.scalarValue},
                    ])}
                  >
                    {value?.scalarValue}
                  </span>
                ) : (
                  <span className="value">{value.scalarValue}</span>
                )}
                {index !== Object.keys(properties).length && (
                  <span className="punctuation-char">, </span>
                )}
              </span>
            )
          );
        })}
        <span>{' }'}</span>
      </span>
    );
  };

  const renderItem = (
    content: SchemaJSightContentType,
    index: number,
    isLastItem: boolean
  ): JSX.Element | null => {
    if (content.properties) {
      return (
        <span key={index.toString()}>
          {renderProperties(content.properties)}
          {!isLastItem && <span className="punctuation-char">, </span>}
        </span>
      );
    } else if (content.scalarValue) {
      return (
        <span key={index.toString()}>
          <span
            onClick={(e) => {
              e.stopPropagation();
              (content.scalarValue as string)[0] === '@' &&
                setSchema(content?.scalarValue ? String(content?.scalarValue) : null);
            }}
            className={clsx([
              (content.scalarValue as string)[0] === '@' ? 'clickable-value' : 'value',
              {expanded: currentSchema === content?.scalarValue},
            ])}
          >
            {`"${content?.scalarValue}"`}
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
