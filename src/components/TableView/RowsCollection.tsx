import React from 'react';
import {JsightSchemaElement} from 'types/exchange';
import {TableRow} from 'components/TableView/TableRow';

interface RowsCollectionProps {
  content: JsightSchemaElement;
  block?: string;
  level?: number;
  isNestedChild?: boolean;
  key?: string | number;
  isArrayLastItem?: boolean;
}

export const RowsCollection = ({
  content,
  block,
  level = 0,
  isNestedChild = false,
  key,
}: RowsCollectionProps): JSX.Element[] => {
  let rows: JSX.Element[] = [];

  if (content.tokenType === 'reference') {
    rows.push(
      <TableRow
        key={`${level}-${level === 0 ? 'root' : content.key || key}`}
        keyValue={level === 0 ? '<root>' : content.key || String(key)}
        level={level + 1}
        property={content}
        isNestedChild={isNestedChild}
      />
    );
  } else if (content.tokenType === 'object' || content.tokenType === 'array') {
    const isArray = content.tokenType === 'array';
    rows.push(
      <TableRow
        key={`${level}-${level === 0 ? 'root' : key}`}
        keyValue={level === 0 ? '<root>' : String(key)}
        level={level + 1}
        property={content}
        isNestedChild={isNestedChild}
      />
    );
    content.children?.forEach((item, index) => {
      const childrenRows = RowsCollection({
        block,
        isNestedChild: level > 0,
        level: level + 1,
        content: item,
        key: String(isArray ? index : item.key || index),
        isArrayLastItem: isArray && (content.children || []).length - 1 === index,
      });
      rows = rows.concat(childrenRows);
    });
  } else if (['number', 'string', 'boolean', 'null'].includes(content.tokenType)) {
    rows.push(
      <TableRow
        key={`${level}-${level === 0 ? 'root' : key}`}
        keyValue={level === 0 ? '<root>' : String(key)}
        level={level + 1}
        property={content}
        isNestedChild={isNestedChild}
      />
    );
  }

  return rows;
};
