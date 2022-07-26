import React from 'react';
import {JsightSchemaElement} from 'types/exchange';
import {map} from 'lodash';
import {BracketOpen, BracketClose, ShortcutType, ScalarType} from './Line';
import {Rules} from 'components/CodeView/Line/Rules';
import './Line.styles.scss';

interface JSightContentProps {
  content: JsightSchemaElement;
  tab: number; // right indent
  propName?: string; // property name
  propType?: string; // property type
  currentLine?: number;
  isLastLine?: boolean;
  schemasNames: string[];
  parentNumber?: string;
  parentInheritedNumber?: string;
  disableOpenBracket?: boolean;
  level: number;
  itemIndex?: number;
}

export const LinesCollection: (params: JSightContentProps) => JSX.Element[] = ({
  content,
  propName,
  propType,
  tab,
  currentLine = 0,
  isLastLine,
  schemasNames,
  parentNumber,
  disableOpenBracket,
  parentInheritedNumber,
  level,
  itemIndex,
}) => {
  let lines: JSX.Element[] = [];

  if (content.jsonType === 'object') {
    const propertiesLength = Object.keys(content.properties || {}).length;
    const bracketOpenNumberLine = `${parentNumber ? `${parentNumber}-` : ''}${
      lines.length + currentLine + 1
    }`;

    if (!disableOpenBracket) {
      lines.push(
        <BracketOpen
          isEmpty={!propertiesLength}
          isLastLine={!!isLastLine}
          key={`line-${lines.length + currentLine + 1}`}
          bracket="{"
          propName={propName}
          isKeyShortcut={content.isKeyShortcut}
          numberLine={bracketOpenNumberLine}
          tab={tab}
          rules={content.rules}
          optional={content.optional}
          notes={content.note}
          rulesRender={(args) => (
            <Rules
              schemaName={schemasNames.slice(-1).pop()}
              note={content.note}
              propType={propType}
              level={level}
              content={content}
              {...args}
            />
          )}
        />
      );
    }

    if (content.properties) {
      // first go through ingerited poperties
      map(content.properties, (value, key) => {
        return {...value, key};
      })
        .sort((a, b) => Number(!!b.inheritedFrom) - Number(!!a.inheritedFrom))
        .forEach((value, index) => {
          const linesCollection = LinesCollection({
            content: value as JsightSchemaElement,
            propName: value.key,
            propType: value.type,
            currentLine: lines.length + currentLine,
            isLastLine: index + 1 === Object.keys(content.properties || {}).length,
            schemasNames,
            tab: tab + 2,
            parentNumber,
            parentInheritedNumber: value.inheritedFrom ? bracketOpenNumberLine : undefined,
            level,
          });
          lines = lines.concat(linesCollection);
        });
    }

    if (propertiesLength) {
      lines.push(
        <BracketClose
          key={`line-${lines.length + currentLine + 1}`}
          tab={tab}
          bracket={`}${isLastLine ? '' : ','}`}
        />
      );
    }
  } else if (content.jsonType === 'array') {
    const itemsLength = content.items?.length;

    lines.push(
      <BracketOpen
        isEmpty={!itemsLength}
        isLastLine={!!isLastLine}
        bracket="["
        key={`line-${lines.length + currentLine + 1}`}
        propName={propName}
        tab={tab}
        rules={content.rules}
        optional={content.optional}
        notes={content.note}
        numberLine={`${parentNumber ? `${parentNumber}-` : ''}${lines.length + currentLine + 1}`}
        rulesRender={(args) => (
          <Rules
            propType={propType}
            schemaName={schemasNames.slice(-1).pop()}
            note={content.note}
            level={level}
            parentNumber={parentNumber}
            content={content}
            {...args}
          />
        )}
      />
    );

    if (content.items) {
      content.items.forEach((item, index) => {
        const contentLines = LinesCollection({
          content: item,
          tab: tab + 2,
          currentLine: lines.length + currentLine,
          isLastLine: index + 1 === content.items?.length,
          propType: item.type,
          schemasNames,
          parentNumber,
          itemIndex: index,
          level,
        });
        lines = lines.concat(contentLines);
      });
    }
    if (itemsLength) {
      lines.push(
        <BracketClose
          tab={tab}
          bracket={`]${isLastLine ? '' : ','}`}
          key={`line-${lines.length + currentLine + 1}`}
        />
      );
    }
  } else if (content.jsonType === 'shortcut') {
    lines.push(
      <ShortcutType
        key={`line-${lines.length + currentLine + 1}`}
        content={content}
        tab={tab}
        isLastLine={!!isLastLine}
        propName={propName}
        schemasNames={schemasNames}
        parentNumber={parentNumber}
        numberLine={`${parentNumber ? `${parentNumber}-` : ''}${lines.length + currentLine + 1}`}
        parentInheritedNumber={parentInheritedNumber}
        level={level}
        itemIndex={itemIndex}
      />
    );
  } else if (content.jsonType === 'annotation') {
    lines.push(
      <span key={`line-${lines.length + currentLine + 1}`} className="code-line">
        <span className="number" />
        <span>{' '.repeat(tab)}</span>
        <span className="comment">{`// ${content.note}`}</span>
      </span>
    );
  } else if (['number', 'string', 'boolean', 'null'].includes(content.jsonType)) {
    lines.push(
      <ScalarType
        level={level}
        key={`line-${lines.length + currentLine + 1}`}
        content={content}
        parentNumber={parentNumber}
        numberLine={`${parentNumber ? `${parentNumber}-` : ''}${lines.length + currentLine + 1}`}
        parentInheritedNumber={parentInheritedNumber}
        isLastLine={!!isLastLine}
        schemaName={schemasNames.slice(-1).pop()}
        tab={tab}
        propName={propName}
        propType={content.type || ''}
        itemIndex={itemIndex}
      />
    );
  }
  return lines;
};
