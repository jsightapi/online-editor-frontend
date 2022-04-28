import React, {useContext, FC, useRef, useEffect} from 'react';
import {RulesType} from 'api/getResources.model';
import {reduce} from 'lodash';
import {RuleItem} from './RuleItem';
import {SchemaViewContext} from 'components/SchemaView';
import {CodeContext} from 'components/CodeView/Code';
import {SchemaJSightContentType} from 'api/getResources.model';
import {RuleNote} from './RuleNote';
import {useShowDetailInfo} from '../../hooks/useShowDetailInfo';

interface RulesProps {
  rules?: RulesType; // rules
  schemaName?: string; // schema that contains this rule
  numberLine: string; // line that contains this rule (1-2-3...)
  tab: number; // indentation
  parentNumber?: string; // parent line (for shortcuts)
  note?: string; // text note
  propName?: string; // name of the property that this rule applies to
  propType?: string; // type of the property that this rule applies to
  level: number;
  itemIndex?: number;
  typeName?: string;
  isLastLine?: boolean;
  content?: SchemaJSightContentType;
}

const firstKeys = ['type', 'enum', 'allOf', 'or'];
const expandKeys = ['type', 'allOf'];

export const Rules: FC<RulesProps> = ({
  rules,
  schemaName,
  numberLine,
  tab,
  parentNumber,
  note,
  propName,
  propType,
  level,
  itemIndex,
  typeName,
  isLastLine,
  content,
}) => {
  const {collapsedRules} = useContext(SchemaViewContext);
  const {updateAnnotations} = useContext(CodeContext);
  const rulesSpanRef = useRef<HTMLSpanElement | null>(null);

  const rulesSortable = Object.fromEntries(
    Object.entries(rules || {}).sort(([key], []) => {
      return firstKeys.includes(key) ? -1 : 1;
    })
  );

  const isShowDetailInfo = useShowDetailInfo(rules, note);

  useEffect(() => {
    updateAnnotations(
      {
        rules: rules as RulesType,
        name:
          propName ||
          (itemIndex !== undefined ? (!isLastLine ? String(itemIndex) : `${itemIndex}–∞`) : ''),
        typeName: propType || typeName || content?.jsonType || '',
        numberLine,
        schemaName,
        spanRef: rulesSpanRef,
        note,
      },
      isShowDetailInfo, // if true - add, otherwise - delete
      parentNumber
    );
  }, [
    rules,
    schemaName,
    numberLine,
    parentNumber,
    propName,
    propType,
    note,
    typeName,
    isShowDetailInfo,
    itemIndex,
  ]);

  if (rules && Object.keys(rules).length) {
    let ruleIndex = 1;

    return (
      <span ref={rulesSpanRef} className="comment">
        <span>{' // '}</span>
        <span className="rules">
          <span>{'{ '}</span>
          {rules &&
            reduce<RulesType, JSX.Element[]>(
              rulesSortable,
              (result, currentValue, key) => {
                let nextResult = [];

                if (ruleIndex > 1 && collapsedRules) {
                  if (ruleIndex === 2) {
                    nextResult = [
                      ...result,
                      <span key={`rules-collapsed-${key}`} className="rules-collapsed base">
                        {`+${Object.keys(rules).length - 1}`}
                      </span>,
                    ];
                  } else {
                    nextResult = result;
                  }
                } else {
                  nextResult = [
                    ...result,
                    <RuleItem
                      level={level}
                      tab={tab}
                      numberLine={numberLine}
                      parentNumber={parentNumber}
                      propName={key}
                      rule={currentValue}
                      key={`rule-${key}`}
                      isLastRule={Object.keys(rules).length === ruleIndex}
                      schemaName={schemaName}
                      alwaysInline={!expandKeys.includes(key)}
                    />,
                  ];
                }
                ruleIndex++;
                return nextResult;
              },
              []
            )}
          <span>{' }'}</span>
        </span>
        <span>
          {note && (
            <>
              {' -'}
              <RuleNote note={note} collapsedRules={collapsedRules} />
            </>
          )}
        </span>
      </span>
    );
  } else if (note) {
    return (
      <span className="comment">
        {' '}
        // <RuleNote note={note} collapsedRules={collapsedRules} />
      </span>
    );
  } else {
    return null;
  }
};
