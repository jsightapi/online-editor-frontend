import React, {useContext, useRef} from 'react';
import {RuleType} from 'types/exchange';
import {DetailEnum} from './DetailEnum';
import {TextWithTooltip} from 'components/TextWithTooltip';
import {formatNotes} from '../utils/formatNotes';
import './DetailCard.scss';
import {MainContext, SidebarContext} from 'store';

interface DetailCardProps {
  name: string;
  typeName?: string;
  rules?: RuleType[];
  schemaName?: string;
  codeViewRef?: React.MutableRefObject<HTMLDivElement | null>;
  numberLine: string;
  note?: string;
  updateDetailWrapperHeight(): void;
  index?: number;
  isTableView?: boolean;
  keyBlock: string;
}

export const DetailCard = ({
  name,
  rules,
  schemaName,
  typeName,
  note,
  numberLine,
  updateDetailWrapperHeight,
  isTableView,
  keyBlock,
}: DetailCardProps) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const {setCurrentDocSidebar} = useContext(SidebarContext);
  const {setSelectedLine} = useContext(MainContext);

  const renderRule = (rule: RuleType, key: string, rulesLength: number, index: number) => {
    if (['boolean', 'string', 'number', 'null'].includes(rule.tokenType)) {
      return (
        <span key={`rule-${key}`} className="detail-code-line">
          <span className="name">{key}</span>
          <span className="punctuation-char">: </span>
          <span className="value">{String(rule.scalarValue)}</span>
          {index !== rulesLength && <span className="punctuation-char">,</span>}
        </span>
      );
    } else if (rule.tokenType === 'array') {
      return (
        rule.children && (
          <span key={`rule-${key}`}>
            <span className="detail-code-line">
              <span className="name">{key}</span>
              <span className="punctuation-char">: [</span>
            </span>
            <DetailEnum
              keyBlock={keyBlock}
              updateDetailWrapperHeight={updateDetailWrapperHeight}
              items={rule.children}
            />
            <span className="detail-code-line">
              <span className="punctuation-char">]{index !== rulesLength && ','}</span>
            </span>
          </span>
        )
      );
    } else {
      return <div />;
    }
  };

  const closeDetailCard = () => {
    setCurrentDocSidebar(null);
    setSelectedLine(null);
  };

  const renderBody = (rules?: RuleType[]): JSX.Element => {
    let index = 0;
    const rulesKeys = Object.keys(rules || []);
    const rulesLength =
      rulesKeys.includes('type') && isTableView ? rulesKeys.length - 1 : rulesKeys.length;

    return (
      <pre className="body">
        <code>
          {note && (
            <span>
              <span className="detail-code-line">
                <span className="comment">{formatNotes(note)}</span>
              </span>
              <span className="detail-code-line">&nbsp;</span>
            </span>
          )}
          {(rules || []).map((rule) => {
            const preventRender = isTableView && rule.key == 'type';
            !preventRender && index++;
            return !preventRender && renderRule(rule, rule.key, rulesLength, index);
          })}
        </code>
      </pre>
    );
  };

  return (
    <div
      ref={divRef}
      data-name={`line-${numberLine}`}
      data-schema={`schema-${schemaName || 'none'}`}
      className={isTableView ? 'active' : 'detail-card'}
    >
      {!isTableView && (
        <>
          <div className="d-flex wrapper-close">
            <div className="close-card" onClick={() => closeDetailCard()}>
              <i className="icon-close" />
            </div>
          </div>
          <div className="d-flex header">
            <div className="name">
              <TextWithTooltip text={name} />
            </div>
            <div className="type">
              <TextWithTooltip text={typeName || ''} />
            </div>
          </div>
        </>
      )}
      {renderBody(rules)}
    </div>
  );
};
