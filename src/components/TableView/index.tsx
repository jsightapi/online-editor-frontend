import React from 'react';
import {JsightSchemaElement, SchemaType} from 'types/exchange';
import {ControlElements} from '../ControlElements';
import {TableRow} from 'components/TableView/TableRow';
import './TableView.styles.scss';
import {RowsCollection} from 'components/TableView/RowsCollection';

interface TableViewProps {
  keyBlock: string;
  schema?: SchemaType;
  format?: string;
  block?: string; // path, query etc.
}

export const TableView = ({keyBlock, schema, format, block}: TableViewProps) => {
  const renderRowsCollection = () => {
    if (schema?.notation === 'jsight') {
      return RowsCollection({
        content: schema.content as JsightSchemaElement,
        block,
        level: 0,
      });
    } else if ('regex') {
      return (
        <TableRow
          keyValue={'<root>'}
          isNestedChild={false}
          level={0}
          property={{
            tokenType: 'string',
            type: 'string',
            optional: false,
            rules: [{key: 'regexp', tokenType: 'string', scalarValue: schema?.content as string}],
            note: (
              <span className="detail-code-line code-font">
                <span className="name">{schema?.notation}</span>
                <span className="punctuation-char">{`:\u00A0`}</span>
                <span className="value">{schema?.content}</span>
              </span>
            ),
          }}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <table className="params-table flex-auto">
      <thead>
        <tr>
          <th>Key / Index</th>
          <th>Type</th>
          <th>Description</th>
          <th>
            <ControlElements keyBlock={keyBlock} initType={'table'} ableChangeView={true} />
          </th>
        </tr>
      </thead>
      <tbody>{renderRowsCollection()}</tbody>
      <tfoot>
        <tr>
          <td colSpan={4}>{format}</td>
        </tr>
      </tfoot>
    </table>
  );
};
