import React, {forwardRef, useContext, useMemo, useEffect, useState} from 'react';
import {DetailCard} from '../CodeView/DetailCard';
import {AnnotationType} from './Code';
import {MainContext, SidebarContext} from 'store';

interface RightRulesProps {
  annotations: AnnotationType[];
  height: number;
  topOffset: number;
  rightOffset: number;
  codeViewRef: React.MutableRefObject<HTMLDivElement | null>;
  updateDetailWrapperHeight(): void;
  linesCollection?: JSX.Element[];
  keyBlock: string;
}

export const RightRules = forwardRef<HTMLDivElement, RightRulesProps>(
  (
    {
      updateDetailWrapperHeight,
      annotations,
      height,
      topOffset,
      rightOffset,
      codeViewRef,
      linesCollection,
      keyBlock,
    },
    ref
  ) => {
    const {currentDocSidebar} = useContext(SidebarContext);
    const {selectedLine} = useContext(MainContext);

    const rightWidth = useMemo(() => rightOffset - 30, [rightOffset]);
    const offsetLeft = useMemo(() => -rightWidth - 18, [rightWidth]);

    const [rulesDataWithoutAnnotations, setRulesDataWithoutAnnotations] = useState({
      propName: '',
      propType: '',
      notes: '',
    });

    const sortAnnotations = (a: any, b: any) => {
      return a.numberLine > b.numberLine ? -1 : 1;
    };

    useEffect(() => {
      if (!annotations.length) {
        const selectedLineObj = linesCollection?.filter((item: JSX.Element) => {
          return item.key === 'line-' + selectedLine?.numberLine;
        });

        if (selectedLineObj && selectedLineObj.length) {
          setRulesDataWithoutAnnotations({
            propName: selectedLineObj[0].props.propName,
            propType: selectedLineObj[0].props.propType,
            notes: selectedLineObj[0].props?.content?.note,
          });
        }
      }
    }, [selectedLine?.numberLine]);

    return (
      <div
        className="right-rules-wrapper"
        style={{
          display: currentDocSidebar === 'rules' ? 'block' : 'none',
          width: rightWidth || 0,
          right: offsetLeft || 0,
          height,
        }}
      >
        <div className="inner-wrapper" ref={ref} style={{top: topOffset}}>
          <>
            {!annotations.length && (
              <DetailCard
                updateDetailWrapperHeight={updateDetailWrapperHeight}
                key={`card-${selectedLine?.numberLine}`}
                name={rulesDataWithoutAnnotations.propName}
                typeName={rulesDataWithoutAnnotations.propType}
                numberLine={selectedLine?.numberLine || '0'}
                schemaName={''}
                codeViewRef={codeViewRef}
                note={rulesDataWithoutAnnotations.notes}
                keyBlock={keyBlock}
              />
            )}
          </>
          {annotations
            .map((item) => (
              <DetailCard
                updateDetailWrapperHeight={updateDetailWrapperHeight}
                key={`card-${item.numberLine}`}
                name={item.name}
                typeName={item.typeName}
                rules={item.rules}
                numberLine={item.numberLine}
                schemaName={item.schemaName || ''}
                codeViewRef={codeViewRef}
                note={item.note}
                keyBlock={keyBlock}
              />
            ))
            .sort(sortAnnotations)}
        </div>
      </div>
    );
  }
);
