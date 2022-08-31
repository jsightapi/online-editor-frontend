import React from 'react';
import {RuleType} from 'types/exchange';
import {DetailEnum} from 'components/CodeView/DetailCard/DetailEnum';

interface DetailObjectProps {
  keyBlock: string;
  properties: RuleType[];
  tab: number;
  isLast: boolean;
}

export const DetailObject = ({properties, tab, isLast, keyBlock}: DetailObjectProps) => {
  return (
    <span>
      <span className="detail-code-line">
        <span className="punctuation-char">{`${' '.repeat(tab)}{`}</span>
      </span>
      {properties.map((item, index) => {
        if (item.tokenType === 'array' && item.children) {
          return (
            <span key={item.key}>
              <span className="detail-code-line">
                <span>{`${' '.repeat(tab + 2)}`}</span>
                <span className="name">{item.key}</span>
                <span className="punctuation-char">: [</span>
              </span>
              <DetailEnum
                tab={tab + 2}
                keyBlock={keyBlock}
                updateDetailWrapperHeight={() => {}}
                items={item.children}
              />
              <span className="detail-code-line">
                <span>{`${' '.repeat(tab + 2)}`}</span>
                <span className="punctuation-char">]{properties.length !== index + 1 && ','}</span>
              </span>
            </span>
          );
        } else {
          const scalarValue = item?.scalarValue ?? '';
          return (
            <span key={item.key} className="detail-code-line">
              <span>{`${' '.repeat(tab + 2)}`}</span>
              <span className="name">{item.key}</span>
              <span className="punctuation-char">: </span>
              <span className="value">{scalarValue}</span>
              {properties.length !== index + 1 && <span className="punctuation-char">,</span>}
            </span>
          );
        }
      })}
      <span className="detail-code-line">
        <span className="punctuation-char">{`${' '.repeat(tab)}}${isLast ? '' : ','}`}</span>
      </span>
    </span>
  );
};
