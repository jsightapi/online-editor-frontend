import React, {useMemo, useRef, useState} from 'react';
import {ControlElements} from '../ControlElements';
import {Code} from './Code';
import {CodeViewProps} from './index';
import {UnmountClosed} from 'react-collapse';
import clsx from 'clsx';

interface WrapperProps {
  isOpen: boolean;
  isCollapsible: boolean;
  children?: React.ReactNode;
}

const Wrapper = ({children, isCollapsible, isOpen}: WrapperProps) => {
  if (isCollapsible) {
    return <UnmountClosed isOpened={isOpen}>{children}</UnmountClosed>;
  }

  return <>{children}</>;
};

export const CodeViewBaseComponent = ({
  schema,
  format,
  name,
  isCollapsible,
  keyBlock,
}: CodeViewProps) => {
  const codeViewRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen((prev) => !prev);

  const nameClasses = useMemo(() => clsx(['name', {pointer: isCollapsible}]), [isCollapsible]);

  return (
    <div ref={codeViewRef} className="code-view flex-auto">
      <div className="header">
        <div className={nameClasses} onClick={toggle}>
          {isCollapsible && <i className={isOpen ? 'icon-arrow-down' : 'icon-arrow-right'} />}
          {name || ''}
        </div>
        <ControlElements
          keyBlock={keyBlock}
          initType={'code'}
          ableChangeView={true}
          ableExpandRules={true}
          ableExpandTypes={true}
        />
      </div>
      <Wrapper isCollapsible={!!isCollapsible} isOpen={isOpen}>
        <pre>
          <code>
            <span className="code-line extreme">
              <span className="number" />
            </span>
            {schema && (
              <Code
                keyBlock={keyBlock}
                schema={schema}
                name={name}
                tab={0}
                codeViewRef={codeViewRef}
              />
            )}
            <span className="code-line extreme">
              <span className="number" />
            </span>
          </code>
          <div className="schema-info code-line">
            <span className="number" />
            <span className="schema-format">
              {schema?.notation || ''}
              {format ? ` • ${format}` : ''}
            </span>
          </div>
        </pre>
      </Wrapper>
    </div>
  );
};
