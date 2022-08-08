import React from 'react';
import './JsonRpcHeader.styles.scss';

interface JsonRpcHeaderProps {
  title: string;
}

export const JsonRpcHeader = ({title}: JsonRpcHeaderProps) => (
  <div className="json-rpc-header">
    <h3>{title}</h3>
    <div className="protocol">
      Protocol: <strong>json-rpc-2.0</strong>
    </div>
  </div>
);
