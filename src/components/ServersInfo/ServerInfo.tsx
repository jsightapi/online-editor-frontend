import React, {FC} from 'react';
import {ServerType} from 'types/exchange';
import {SchemaView} from '../SchemaView';
import './ServerInfo.styles.scss';

interface SeverInfoProps {
  name: string;
  serverInfo: ServerType;
}

export const ServerInfo: FC<SeverInfoProps> = ({name, serverInfo}) => (
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
      {serverInfo.baseUrlVariables && (
        <div className="base-url-variables">
          <SchemaView
            keyBlock={'server-info'}
            schema={serverInfo.baseUrlVariables.schema}
            type="code"
          />
        </div>
      )}
    </div>
  </div>
);
