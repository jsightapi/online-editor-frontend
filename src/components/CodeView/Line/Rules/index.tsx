import React, {useContext, useRef, useEffect, useMemo} from 'react';
import {JsightSchemaElement, RuleType} from 'types/exchange';
import {RuleItem} from './RuleItem';
import {SchemaViewContext} from 'store';
import {CodeContext} from 'components/CodeView/Code';
import {RuleNote} from './RuleNote';
import {useShowDetailInfo} from '../../hooks/useShowDetailInfo';
import {isEqual} from 'lodash';

interface RulesProps {
  rules: RuleType[]; // rules
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
  content?: JsightSchemaElement;
}

const firstKeys = ['type', 'enum', 'allOf', 'or'];
const expandKeys = ['type', 'allOf'];

export const Rules = React.memo(
  ({
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
  }: RulesProps) => {
    const {collapsedRules} = useContext(SchemaViewContext);
    const {updateAnnotations} = useContext(CodeContext);
    const rulesSpanRef = useRef<HTMLSpanElement | null>(null);

    const rulesSortable: RuleType[] = useMemo(() => {
      return rules.sort((a, b) => {
        if (firstKeys.includes(a.key) && firstKeys.includes(b.key)) {
          return 0;
        }
        return firstKeys.includes(a.key) ? -1 : 1;
      });
    }, [rules]);

    const isShowDetailInfo = useShowDetailInfo(rules, note);

    useEffect(() => {
      updateAnnotations(
        {
          rules,
          name:
            propName ||
            (itemIndex !== undefined ? (!isLastLine ? String(itemIndex) : `${itemIndex}–∞`) : ''),
          // typeName: propType || typeName || content?.jsonType || '',
          typeName: propType || typeName || '',
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
            {rulesSortable.reduce<JSX.Element[]>((result, currentValue) => {
              let nextResult = [];

              if (ruleIndex > 1 && collapsedRules) {
                if (ruleIndex === 2) {
                  nextResult = [
                    ...result,
                    <span
                      key={`rules-collapsed-${currentValue.key}`}
                      className="rules-collapsed base"
                    >
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
                    propName={String(currentValue.key)}
                    rule={currentValue}
                    key={`rule-${currentValue.key}`}
                    isLastRule={Object.keys(rules).length === ruleIndex}
                    schemaName={schemaName}
                    alwaysInline={!expandKeys.includes(currentValue.key)}
                  />,
                ];
              }
              ruleIndex++;
              return nextResult;
            }, [])}
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
  },
  (prev, next) => isEqual(prev, next)
);
