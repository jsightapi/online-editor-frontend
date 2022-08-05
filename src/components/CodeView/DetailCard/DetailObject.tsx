import React from 'react';
import {JsightSchemaElement, RuleType} from 'types/exchange';

interface DetailObjectProps {
  properties: RuleType[];
  tab: number;
  isLast: boolean;
}

export const DetailObject = ({properties, tab, isLast}: DetailObjectProps) => {
  let index = 0;
  const length = properties.length;

  return (
    <span>
      <span className="detail-code-line">
        <span className="punctuation-char">{`${' '.repeat(tab)}{`}</span>
      </span>
      {properties.map((item) => {
        const scalarValue = item?.scalarValue ?? '';
        index++;
        return (
          <span key={item.key} className="detail-code-line">
            <span>{`${' '.repeat(tab + 2)}`}</span>
            <span className="name">{item.key}</span>
            <span className="punctuation-char">: </span>
            <span className="value">{scalarValue}</span>
            {length !== index && <span className="punctuation-char">,</span>}
          </span>
        );
      })}
      <span className="detail-code-line">
        <span className="punctuation-char">{`${' '.repeat(tab)}}${isLast ? '' : ','}`}</span>
      </span>
    </span>
  );
};
