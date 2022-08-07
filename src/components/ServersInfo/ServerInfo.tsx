import React from 'react';
import {ServerType} from 'types/exchange';
import './ServerInfo.styles.scss';

interface SeverInfoProps {
  name: string;
  serverInfo: ServerType;
}

export const ServerInfo = ({name, serverInfo}: SeverInfoProps) => (
  <div className="server-info d-flex">
    <div className="before">
      <i className="icon-server" />
    </div>
    <div className="content">
      <div>
        <div className="title">{name}</div>
        <div className="annotation">{serverInfo.annotation}</div>
      </div>
      <div className="base-url">{serverInfo.baseUrl}</div>
    </div>
  </div>
);
