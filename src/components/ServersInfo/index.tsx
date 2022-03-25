import React, {FC} from 'react';
import {map} from 'lodash';
import {ServerInfo} from './ServerInfo';
import {CollapsibleContent} from '../CollapsibleContent';
import {ServersInfoType} from 'api/getResources.model';
import './ServersInfo.styles.scss';

interface ServersInfoProps {
  serversInfo?: ServersInfoType;
}

export const ServersInfo: FC<ServersInfoProps> = ({serversInfo}) => {
  return serversInfo ? (
    <div className="servers-wrapper">
      <CollapsibleContent title="Servers">
        {map(serversInfo, (server, key) => (
          <ServerInfo key={key} name={key} serverInfo={server} />
        ))}
      </CollapsibleContent>
    </div>
  ) : null;
};
