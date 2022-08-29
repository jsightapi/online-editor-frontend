import React, {useContext, useEffect, useMemo} from 'react';
import {RuleType} from 'types/exchange';
import {DetailObject} from './DetailObject';
import clsx from 'clsx';
import {MainContext} from 'store';
import {wrapInQuotes} from 'utils/wrapInQuotes';

interface DetailEnumProps {
  keyBlock: string;
  items: RuleType[];
  updateDetailWrapperHeight?: () => void;
  tab?: number;
}

export const DetailEnum = ({
  keyBlock,
  items,
  updateDetailWrapperHeight,
  tab = 0,
}: DetailEnumProps) => {
  const {schemasView, setExpandDetailCard} = useContext(MainContext);

  const isOpen = useMemo(
    () => schemasView.find((item) => item.key === keyBlock)?.expandDetailCard,
    [schemasView]
  );

  useEffect(() => {
    updateDetailWrapperHeight && updateDetailWrapperHeight();
  }, [isOpen]);

  const toggle = () => {
    setExpandDetailCard(keyBlock, !isOpen);
  };

  const renderItem = (item: RuleType, index: number): JSX.Element | null => {
    switch (item.tokenType) {
      case 'object':
        return item.children ? (
          <DetailObject
            keyBlock={keyBlock}
            key={`${index}-${item.scalarValue}`}
            isLast={index + 1 === items.length}
            tab={tab + 2}
            properties={item.children}
          />
        ) : null;
      case 'annotation':
        return (
          <span key={`annotation-${index.toString()}`} className="code-line">
            <span>{' '.repeat(tab)}</span>
            <span className="comment">{`// ${item.note}`}</span>
          </span>
        );
      case 'number':
      case 'boolean':
      case 'string':
      case 'null':
      case 'reference':
        return (
          <span key={`${index}-${item.scalarValue}`} className="detail-code-line">
            <span>{' '.repeat(2 + tab)}</span>
            <span className={clsx('value', `value-${item.tokenType}`)}>
              {String(
                wrapInQuotes(
                  item.scalarValue || '',
                  !['string', 'reference'].includes(item.tokenType)
                )
              )}
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
