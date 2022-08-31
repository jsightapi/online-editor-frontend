import React from 'react';
import {ControlElements} from '../ControlElements';
import {LinesCollection} from './LinesCollection';
import {JsightSchemaElement, RuleType} from 'types/exchange';

interface EnumViewProps {
  content?: RuleType;
  name?: string;
  keyBlock: string;
}

export const EnumView = ({content, name, keyBlock}: EnumViewProps) => {
  return (
    <div className="code-view flex-auto">
      <div className="header">
        <div className="name">{name || ''}</div>
        <ControlElements keyBlock={keyBlock} initType={'code'} />
      </div>
      <pre>
        <code>
          <span className="code-line extreme">
            <span className="number" />
          </span>
          {content && (
            <span className="schema-wrapper enum">
              {LinesCollection({
                content: (content as unknown) as JsightSchemaElement,
                tab: 0,
                isLastLine: true,
                level: 0,
                schemasNames: [],
              })}
            </span>
          )}
          <span className="code-line extreme">
            <span className="number" />
          </span>
        </code>
      </pre>
    </div>
  );
};
