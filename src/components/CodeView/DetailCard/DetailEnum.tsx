import React, {FC, useContext, useEffect, useMemo} from 'react';
import {SchemaJSightContentType} from 'types/exchange';
import {DetailObject} from './DetailObject';
import clsx from 'clsx';
import {MainContext} from 'store';

interface DetailEnumProps {
  keyBlock: string;
  items: SchemaJSightContentType[];
  updateDetailWrapperHeight(): void;
}

export const DetailEnum: FC<DetailEnumProps> = ({keyBlock, items, updateDetailWrapperHeight}) => {
  const {schemasView, setExpandDetailCard} = useContext(MainContext);

  const isOpen = useMemo(
    () => schemasView.find((item) => item.key === keyBlock)?.expandDetailCard,
    [schemasView]
  );

  useEffect(() => {
    updateDetailWrapperHeight();
  }, [isOpen]);

  const toggle = () => {
    setExpandDetailCard(keyBlock, !isOpen);
  };

  const renderItem = (item: SchemaJSightContentType, index: number): JSX.Element | null => {
    switch (item.jsonType) {
      case 'object':
        return item.properties ? (
          <DetailObject
            key={`${index}-${item.scalarValue}`}
            isLast={index + 1 === items.length}
            tab={2}
            properties={item.properties}
          />
        ) : null;
      case 'annotation':
        return (
          <span key={`annotation-${index.toString()}`} className="code-line">
            <span className="comment">{`// ${item.note}`}</span>
          </span>
        );
      case 'number':
      case 'boolean':
      case 'string':
      case 'null':
        return (
          <span key={`${index}-${item.scalarValue}`} className="detail-code-line">
            <span>{' '.repeat(2)}</span>
            <span className={clsx('value', `value-${item.jsonType}`)}>
              {item.scalarValue?.toString()}
            </span>
            {index + 1 !== items.length && <span className="punctuation-char">, </span>}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <span>
      {items.slice(0, isOpen ? undefined : 5).map((item, index) => renderItem(item, index))}
      {items.length > 5 && (
        <button className="btn-expand" onClick={toggle}>
          Expand all <i className={isOpen ? 'icon-arrow-up' : 'icon-arrow-down'} />
        </button>
      )}
    </span>
  );
};
