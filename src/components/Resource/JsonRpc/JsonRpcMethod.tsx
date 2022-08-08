import React from 'react';
import './JsonRpcMethod.styles.scss';

interface JsonRpcMethodProps {
  method: string;
  description?: string;
  annotation?: string;
}

export const JsonRpcMethod = ({method, description, annotation}: JsonRpcMethodProps) => {
  return (
    <div className="json-rpc-method">
      <div className="d-flex">
        <div className="head">
          <div className="method-name">METHOD</div>
          <div className="method-value">{method}</div>
          {annotation && <div className="method-annotation">{annotation}</div>}
        </div>
      </div>
      {description && <div className="description">{description}</div>}
    </div>
  );
};
