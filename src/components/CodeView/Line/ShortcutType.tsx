import React, {useMemo, useState, useRef, useContext, useEffect} from 'react';
import clsx from 'clsx';
import {SchemaJSightContentType} from 'api/getResources.model';
import {PropName} from './Element/PropName';
import {Rules} from './Rules';
import {ObjectContext} from '../store/ObjectContext';
import {useSchemaData} from 'components/CodeView/hooks/useSchemaData';
import {ShortcutLines} from 'components/CodeView/Line/ShortcutLines';
import {SchemaViewContext} from 'components/SchemaView';
import {useSelectionLine} from 'components/CodeView/hooks/useSelectionLine';

interface ShortcutTypeProps {
  parentNumber?: string;
  parentInheritedNumber?: string;
  content: SchemaJSightContentType;
  tab: number; // right indent
  propName?: string;
  schemasNames: string[];
  numberLine: string;
  level: number;
  isLastLine: boolean;
  itemIndex?: number;
}

export const ShortcutType = ({
  content,
  tab,
  propName,
  schemasNames,
  numberLine,
  parentNumber,
  parentInheritedNumber,
  level,
  isLastLine,
  itemIndex,
}: ShortcutTypeProps) => {
  const objectSpanRef = useRef<HTMLSpanElement | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const {currentSchema, setCurrentSchema} = useSchemaData({
    numberLine,
    parentNumber,
  });
  const {expandedTypes} = useContext(SchemaViewContext);
  const {isSelected, isHovered, isHidden, handleLineClick} = useSelectionLine({
    numberLine,
    schemaName: content.inheritedFrom,
    rules: content.rules,
    parentInheritedNumber,
    notes: content.note,
  });

  // user types array
  const userTypes = useMemo(() => {
    const scalarValue = content.scalarValue;
    let shortcuts: string[] = [];

    if (typeof scalarValue === 'string') {
      shortcuts = scalarValue?.split('|').map((i) => i.trim());
    }

    return shortcuts;
  }, [content.scalarValue]);

  useEffect(() => {
    const userType = userTypes[0];
    if (userType && !schemasNames.includes(userType) && level === 0) {
      setCurrentSchema(expandedTypes ? currentSchema || userType : null, true);
    }
    // schemasNames don't exist in dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedTypes, userTypes]);

  const codeLineClasses = useMemo(
    () =>
      clsx({
        'code-line': true,
        shortcut: true,
        inherited: !!content.inheritedFrom,
        'inherited-hover': content.inheritedFrom && isHovered,
        'inherited-hidden': content.inheritedFrom && isHidden,
        expanded: !!currentSchema || expanded,
        selected: isSelected,
      }),
    [currentSchema, expanded, isSelected, isHovered, isHidden, content.inheritedFrom]
  );

  return userTypes.length ? (
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
          {propName && <PropName isKeyShortcut={content.isKeyShortcut} name={propName} />}
          {userTypes.map((userType, key) => (
            <span key={key.toString()}>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSchema(userType);
                }}
                className={clsx('clickable-value', {
                  expanded: currentSchema === userType,
                })}
              >
                {userType}
              </span>
              {key !== userTypes.length - 1 && <span className="punctuation-char"> | </span>}
            </span>
          ))}
          {!isLastLine && <span className="punctuation-char">{','}</span>}
          <Rules
            level={level}
            tab={tab}
            propName={propName}
            numberLine={numberLine}
            schemaName={schemasNames.slice(-1).pop()}
            rules={content.rules}
            note={content.note}
            itemIndex={itemIndex}
            typeName={content.type}
          />
        </span>
        {currentSchema ? (
          <ShortcutLines
            tab={tab + 2}
            schemasNames={[...schemasNames, currentSchema]}
            level={level + 1}
            disableOpenBracket={false}
            numberLine={numberLine}
          />
        ) : null}
      </span>
    </ObjectContext.Provider>
  ) : null;
};
