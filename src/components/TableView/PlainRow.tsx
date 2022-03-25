import React, {FC} from 'react';
import {SchemaJSightContentType} from 'api/getResources.model';
import {DetailCard} from 'components/CodeView/DetailCard';

interface TablePlainRowProps {
  keyValue: string;
  property: SchemaJSightContentType;
  level: number;
  isNestedChild: boolean;
  isLastItem: boolean;
  parentJsonType: any;
  rootIsEmptyArray: boolean;
}

export const PlainRow: FC<TablePlainRowProps> = ({
  keyValue,
  property,
  level,
  isNestedChild,
  parentJsonType,
  isLastItem,
  rootIsEmptyArray,
}) => {
  const leftOffset = level > 1 ? `${level * 20}px` : '0px';
  const isParentArray = parentJsonType === 'array';
  const isPropertyShortcut = property?.jsonType === 'shortcut';
  const isArrayLastItem = isParentArray && isLastItem && !rootIsEmptyArray;

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
