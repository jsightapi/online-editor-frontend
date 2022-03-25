import React, {FC} from 'react';
import {ControlElements} from 'components/ControlElements';
import './ExampleView.styles.scss';

interface ExampleViewProps {
  value: string;
  keyBlock: string;
}

export const ExampleView: FC<ExampleViewProps> = ({value, keyBlock}) => {
  // TODO: this code will be useful for formatting
  // const query = useMemo(() => {
  //   const params = value.split('&');
  //
  //   return params.map((item, index) => {
  //     const param = item.split('=');
  //     return (
  //       <span className="query-params" key={index.toString()}>
  //         <span className="name">{param[0]}</span>
  //         <span className="equal">=</span>
  //         <span className="value">{param[1]}</span>
  //         {index !== params.length - 1 && <span className="punctuation-char">&</span>}
  //       </span>
  //     );
  //   });
  // }, [value]);

  return (
    <div className="code-view flex-auto mb-12">
      <div className="header">
        <div className="name" />
        <ControlElements
          keyBlock={keyBlock}
          initType={'example'}
          ableChangeView={false}
          ableExpandTypes={false}
          ableExpandRules={false}
        />
      </div>
      <pre>
        <code>
          <span className="code-line extreme">
            <span className="number" />
          </span>
          <span className="code-line">
            <span className="number" />
            <span className="required" />
            <span>{value}</span>
          </span>
          <span className="code-line extreme">
            <span className="number" />
          </span>
        </code>
      </pre>
    </div>
  );
};
