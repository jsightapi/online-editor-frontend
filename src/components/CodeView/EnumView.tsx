import React, {FC} from 'react';
import {ControlElements} from '../ControlElements';
import {LinesCollection} from './LinesCollection';
import {SchemaJSightContentType} from 'api/getResources.model';

interface EnumViewProps {
  content?: SchemaJSightContentType;
  name?: string;
  keyBlock: string;
}

export const EnumView: FC<EnumViewProps> = ({content, name, keyBlock}) => {
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
                content,
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
