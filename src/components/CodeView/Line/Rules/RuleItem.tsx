import React, {useContext} from 'react';
import {RuleType} from 'types/exchange';
import {PropName} from 'components/CodeView/Line/Element/PropName';
import {RuleValue} from './RuleValue';
import {SchemaViewContext} from 'store';
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

  const renderArrayItem = (item: RuleType): JSX.Element => {
    if (item.tokenType === 'object') {
      return (
        <span>
          <span>{'{ '}</span>
          {(item.children || []).map((value, index) => {
            return (
              <span key={value.key}>
                <span className="name">{value.key}</span>
                <span className="punctuation-char">: </span>
                <span className="value">{String(value?.scalarValue)}</span>
                {index + 1 !== (item.children || []).length && (
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
          value={item.tokenType === 'string' ? `"${item.scalarValue}"` : String(item.scalarValue)}
          parentNumber={parentNumber}
          ruleProp={propName}
          type={item.tokenType}
        />
      );
    }
  };

  if (rule.tokenType === 'array') {
    return (
      <span>
        <span>{propName && <PropName wrappedInQuotes={false} name={propName} />}[ </span>
        {propName === 'or' ? (
          <RuleValueOr
            items={rule.children || []}
            numberLine={numberLine}
            parentNumber={parentNumber}
            tab={tab}
            level={level}
          />
        ) : (
          <span>
            {rule.children &&
              (collapsedRules && alwaysInline ? (
                <span className="rules-collapsed enum">{`+${rule.children.length}`}</span>
              ) : (
                rule.children.map((item, index) => {
                  return item.scalarValue?.toString() || item.children ? (
                    <span key={`rule-item-${index}`}>
                      {renderArrayItem(item)}
                      {rule.children?.length !== index + 1 && (
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
        {propName && <PropName wrappedInQuotes={false} name={propName} />}
        <RuleValue
          level={level}
          parentNumber={parentNumber}
          numberLine={numberLine}
          value={String(rule.scalarValue)}
          className="value"
          schemaName={schemaName}
          tab={tab}
          type={rule.tokenType}
          ruleProp={propName}
        />
        {!isLastRule && <span className="punctuation-char">, </span>}
      </span>
    );
  }
};
