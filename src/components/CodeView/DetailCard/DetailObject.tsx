import React, {FC} from 'react';
import {SchemaJSightContentType} from 'api/getResources.model';
import {map} from 'lodash';

interface DetailObjectProps {
  properties: {
    [key: string]: SchemaJSightContentType | undefined;
  };
  tab: number;
  isLast: boolean;
}

export const DetailObject: FC<DetailObjectProps> = ({properties, tab, isLast}) => {
  let index = 0;
  const length = Object.keys(properties).length;

  return (
    <span>
      <span className="detail-code-line">
        <span className="punctuation-char">{`${' '.repeat(tab)}{`}</span>
      </span>
      {map(properties, (item, key) => {
        const scalarValue = item?.scalarValue ?? '';
        index++;
        return (
          <span key={key} className="detail-code-line">
            <span>{`${' '.repeat(tab + 2)}`}</span>
            <span className="name">{key}</span>
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
