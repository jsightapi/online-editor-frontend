import React, {useMemo} from 'react';
import {JsightSchemaElement} from 'types/exchange';
import {DetailCard} from 'components/CodeView/DetailCard';
import {wrapInQuotes} from 'utils/wrapInQuotes';

interface TableRowProps {
  keyValue: string;
  property: JsightSchemaElement;
  level: number;
  isNestedChild: boolean;
  isArrayLastItem?: boolean;
}

export const TableRow = ({
  keyValue,
  property,
  level,
  isNestedChild, // nested row
  isArrayLastItem,
}: TableRowProps) => {
  const leftOffset = useMemo(() => (level > 1 ? `${level * 20}px` : '0px'), [level]);
  const isPropertyShortcut = property?.tokenType === 'reference';
  // const isParentArray = parentJsonType === 'array';
  // const isArrayLastItem = isParentArray && isLastItem && !rootIsEmptyArray;

  return (
    <>
      <tr>
        <td className="d-flex v-center" style={{paddingLeft: leftOffset}}>
          {isNestedChild ? <div className="nested-param" /> : null}
          <div className="param-key">
            {isArrayLastItem ? (
              <span className="d-flex">
                <span>{keyValue}-</span>
                <span className="param-key-symbol">&infin;</span>
              </span>
            ) : (
              keyValue
            )}
          </div>
        </td>
        <td>{isPropertyShortcut ? property?.scalarValue : property?.type || ''}</td>
        <td colSpan={2}>
          {property?.note && (
            <div style={{marginBottom: property?.rules ? '0.8rem' : ''}}>{property.note}</div>
          )}
          {property?.rules && (
            <DetailCard
              keyBlock=""
              name=""
              rules={property.rules}
              numberLine={'0'}
              updateDetailWrapperHeight={() => null}
              isTableView={true}
            />
          )}
        </td>
      </tr>
      <tr className="divider">
        <td colSpan={4} style={{marginLeft: leftOffset, width: `calc(100% - ${leftOffset})`}} />
      </tr>
    </>
  );
};
