import React, {useContext, useMemo, useEffect, useState, useLayoutEffect, FC, useRef} from 'react';
import {DetailCard} from '../CodeView/DetailCard';
import {AnnotationType} from './Code';
import {EditorContext, MainContext, SidebarContext} from 'store';
import {map} from 'lodash';

interface RightRulesProps {
  annotations: AnnotationType[];
  height: number;
  codeViewRef: React.MutableRefObject<HTMLDivElement | null>;
  linesCollection?: JSX.Element[];
  keyBlock: string;
  updateHeight: (detailActiveElement: HTMLSpanElement, codeLineDocumentOffset: number) => void;
  isFirst: boolean;
}

export const RightRules: FC<RightRulesProps> = ({
  annotations,
  height,
  codeViewRef,
  linesCollection,
  keyBlock,
  updateHeight,
  isFirst,
}) => {
  const divRulesRef = useRef<HTMLDivElement | null>(null);
  const {currentDocSidebar} = useContext(SidebarContext);
  const {selectedLine} = useContext(MainContext);
  const [topOffset, setTopOffset] = useState<number>(0);
  const [rightOffset, setRightOffset] = useState<number>(0);
  const {editorWidth, isEditor} = useContext(EditorContext);

  useEffect(() => {
    if (!isFirst) {
      const wrapper = divRulesRef.current?.closest<HTMLDivElement>('.resource-content');
      const rightOffset = wrapper ? parseInt(getComputedStyle(wrapper).paddingRight) : 0;
      setRightOffset(rightOffset);
    }
  }, [editorWidth, isEditor]);

  useLayoutEffect(() => {
    const wrapper = divRulesRef.current?.closest<HTMLDivElement>('.resource-content');
    const rightOffset = wrapper ? parseInt(getComputedStyle(wrapper).paddingRight) : 0;
    setRightOffset(rightOffset);

    if (selectedLine?.keyBlock === keyBlock && currentDocSidebar === 'rules') {
      const detailActiveElements = divRulesRef.current?.querySelectorAll<HTMLSpanElement>(
        `[data-name="line-${selectedLine.numberLine}"]`
      );

      const detailActiveElement =
        detailActiveElements && detailActiveElements.length ? detailActiveElements[0] : null;

      map(document.getElementsByClassName('detail-card'), (item) =>
        item.classList.remove('active')
      );
      map(document.getElementsByClassName('right-rules-wrapper'), (item) =>
        item.classList.remove('active')
      );

      detailActiveElements?.forEach((item) => {
        item.classList.add('active');
        item.parentElement?.parentElement?.classList.add('active');
      });

      const codeLineElement = annotations.find(
        (item) => selectedLine?.numberLine === item.numberLine
      )?.spanRef.current;

      if (detailActiveElement && codeLineElement) {
        const detailActiveOffset = detailActiveElement.getBoundingClientRect().top;
        const codeLineDocumentOffset = codeLineElement?.getBoundingClientRect().top;
        setTopOffset((prev) => {
          if (detailActiveOffset > codeLineDocumentOffset) {
            return prev - (detailActiveOffset - codeLineDocumentOffset) - 39;
          } else if (detailActiveOffset < codeLineDocumentOffset) {
            return prev + (codeLineDocumentOffset - detailActiveOffset) - 39;
          } else {
            return prev;
          }
        });
        updateHeight(detailActiveElement, codeLineDocumentOffset);
      }
    }
  }, [selectedLine, currentDocSidebar, keyBlock]);

  const updateDetailWrapperHeight = () => {
    if (selectedLine?.keyBlock === keyBlock && currentDocSidebar === 'rules') {
      const detailActiveElements = divRulesRef.current?.querySelectorAll<HTMLSpanElement>(
        `[data-name="line-${selectedLine.numberLine}"]`
      );

      const detailActiveElement =
        detailActiveElements && detailActiveElements.length ? detailActiveElements[0] : null;

      const codeLineElement = annotations.find(
        (item) => selectedLine?.numberLine === item.numberLine
      )?.spanRef.current;

      if (detailActiveElement && codeLineElement) {
        const codeLineDocumentOffset = codeLineElement?.getBoundingClientRect().top;

        updateHeight(detailActiveElement, codeLineDocumentOffset);
      }
    }
  };

  const rightWidth = useMemo(() => rightOffset - 6, [rightOffset]);
  const offsetLeft = useMemo(() => -rightWidth - 18, [rightWidth]);

  const [rulesDataWithoutAnnotations, setRulesDataWithoutAnnotations] = useState({
    propName: '',
    propType: '',
    notes: '',
  });

  const sortAnnotations = (a: AnnotationType, b: AnnotationType) => {
    return a.numberLine > b.numberLine ? -1 : 1;
  };

  useEffect(() => {
    if (!annotations.length) {
      const selectedLineObj = linesCollection?.filter((item: JSX.Element) => {
        return item.key === 'line-' + selectedLine?.numberLine;
      });

      if (selectedLineObj) {
        setRulesDataWithoutAnnotations({
          propName: selectedLineObj[0].props.propName,
          propType: selectedLineObj[0].props.propType,
          notes: selectedLineObj[0].props?.content?.note,
        });
      }
    }
  }, [selectedLine, linesCollection]);

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
      <div className="inner-wrapper" ref={divRulesRef} style={{top: topOffset}}>
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
        {annotations.sort(sortAnnotations).map((item) => (
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
        ))}
      </div>
    </div>
  );
};
