import React, {FC, useMemo, useRef, useState} from 'react';
import {SchemaJSightContentType} from 'api/getResources.model';
import {PropName} from 'components/CodeView/Line/Element/PropName';
import {getScalarClassName} from '../utils/getScalarClassName';
import {Rules} from './Rules';
import {useSelectionLine} from 'components/CodeView/hooks/useSelectionLine';
import clsx from 'clsx';
import {ObjectContext} from 'components/CodeView/store/ObjectContext';

interface ScalarTypeProps {
  content: SchemaJSightContentType;
  tab: number;
  propName?: string;
  propType?: string;
  isLastLine: boolean;
  schemaName?: string;
  numberLine: string;
  parentNumber?: string;
  parentInheritedNumber?: string;
  level: number;
  itemIndex?: number;
}

export const ScalarType: FC<ScalarTypeProps> = ({
  content,
  tab,
  propName,
  isLastLine,
  schemaName,
  numberLine,
  propType,
  parentNumber,
  parentInheritedNumber,
  level,
  itemIndex,
}) => {
  const objectSpanRef = useRef<HTMLSpanElement | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const {isSelected, isHovered, isHidden, handleLineClick} = useSelectionLine({
    numberLine,
    schemaName: content.inheritedFrom,
    rules: content.rules,
    parentInheritedNumber,
    notes: content.note,
  });

  const codeLineClasses = useMemo(
    () =>
      clsx({
        'code-line': true,
        inherited: !!content.inheritedFrom,
        'inherited-hover': content.inheritedFrom && isHovered,
        'inherited-hidden': content.inheritedFrom && isHidden,
        selected: isSelected,
        expanded,
      }),
    [isSelected, isHovered, isHidden, expanded, content.inheritedFrom]
  );

  return (
    <ObjectContext.Provider value={{expanded, setExpanded, objectSpanRef}}>
      <span ref={objectSpanRef}>
        <span
          onClick={(e) => {
            e.stopPropagation();
            handleLineClick();
          }}
          className={codeLineClasses}
        >
          <span className="number" />
          <span className={clsx(['required', {not: content.optional}])}>
            <i className="icon-star" />
          </span>
          <span>{' '.repeat(tab)}</span>
          {propName !== undefined && (
            <PropName isKeyShortcut={content.isKeyShortcut} name={propName} />
          )}
          <span className={getScalarClassName(content.jsonType)}>
            {String(content.scalarValue)}
          </span>
          {!isLastLine && <span className="punctuation-char">{','}</span>}
          <Rules
            level={level}
            tab={tab}
            numberLine={numberLine}
            parentNumber={parentNumber}
            rules={content.rules}
            schemaName={schemaName}
            note={content.note}
            propName={propName}
            propType={propType}
            itemIndex={itemIndex}
            isLastLine={isLastLine}
          />
        </span>
      </span>
    </ObjectContext.Provider>
  );
};
