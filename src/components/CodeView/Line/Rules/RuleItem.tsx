import React, {useContext} from 'react';
import {RuleType, SchemaJSightContentType} from 'types/exchange';
import {PropName} from 'components/CodeView/Line/Element/PropName';
import {map} from 'lodash';
import {RuleValue} from './RuleValue';
import {SchemaViewContext} from 'components/SchemaView';
import {RuleValueOr} from 'components/CodeView/Line/Rules/RuleValueOr';

interface RuleItemProp {
  rule: RuleType;
  propName: string;
  isLastRule: boolean;
  schemaName?: string;
  numberLine: string;
  tab: number;
  parentNumber?: string;
  level: number;
  alwaysInline?: boolean;
}

export const RuleItem = ({
  rule,
  propName,
  isLastRule,
  schemaName,
  numberLine,
  tab,
  parentNumber,
  level,
  alwaysInline,
}: RuleItemProp) => {
  const {collapsedRules} = useContext(SchemaViewContext);

  const renderArrayItem = (item: SchemaJSightContentType): JSX.Element => {
    if (item.jsonType === 'object') {
      let index = 0;
      return (
        <span>
          <span>{'{ '}</span>
          {item.properties &&
            map(item.properties, (value, key) => {
              index++;
              return (
                <span key={key}>
                  <span className="name">{key}</span>
                  <span className="punctuation-char">: </span>
                  <span className="value">{String(value?.scalarValue)}</span>
                  {index !== Object.keys(item.properties || {}).length && (
                    <span className="punctuation-char">, </span>
                  )}
                </span>
              );
            })}
          <span>{' }'}</span>
        </span>
      );
    } else {
      return (
        <RuleValue
          tab={tab}
          level={level}
          numberLine={numberLine}
          className="array-item"
          schemaName={schemaName}
          value={String(item.scalarValue)}
          parentNumber={parentNumber}
          ruleProp={propName}
          type={item.jsonType}
        />
      );
    }
  };

  if (rule.jsonType === 'array') {
    return (
      <span>
        <span>{propName && <PropName name={propName} />}[ </span>
        {propName === 'or' ? (
          <RuleValueOr
            items={rule.items}
            numberLine={numberLine}
            parentNumber={parentNumber}
            tab={tab}
            level={level}
          />
        ) : (
          <span>
            {rule.items &&
              (collapsedRules && alwaysInline ? (
                <span className="rules-collapsed enum">{`+${rule.items.length}`}</span>
              ) : (
                rule.items.map((item, index) => {
                  return item.scalarValue?.toString() || item.properties ? (
                    <span key={`rule-item-${index}`}>
                      {renderArrayItem(item)}
                      {rule.items?.length !== index + 1 && (
                        <span className="punctuation-char">, </span>
                      )}
                    </span>
                  ) : (
                    <span key={`rule-item-${index}`} />
                  );
                })
              ))}
          </span>
        )}

        <span> ]{!isLastRule && <span className="punctuation-char">, </span>}</span>
      </span>
    );
  } else {
    return (
      <span>
        {propName && <PropName name={propName} />}
        <RuleValue
          level={level}
          parentNumber={parentNumber}
          numberLine={numberLine}
          value={String(rule.scalarValue)}
          className="value"
          schemaName={schemaName}
          tab={tab}
          type={rule.jsonType}
          ruleProp={propName}
        />
        {!isLastRule && <span className="punctuation-char">, </span>}
      </span>
    );
  }
};
