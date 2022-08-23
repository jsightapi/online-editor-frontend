import React from 'react';
import {JsonRpcInteractionType} from 'types';
import {JsonRpcMethod} from 'components/Resource/JsonRpc/JsonRpcMethod';
import {ResourceBlock} from 'components/Resource/ResourceBlock';
import './JsonRpcResource.styles.scss';

interface JsonRpcResourceProps {
  interaction: JsonRpcInteractionType;
  resourceKey: string;
}

export const JsonRpcResource = ({interaction, resourceKey}: JsonRpcResourceProps) => {
  return (
    <div className="resource-wrapper">
      <JsonRpcMethod
        method={interaction.method}
        annotation={interaction.annotation}
        description={interaction.description}
      />
      {interaction.params && (
        <ResourceBlock
          keyBlock={`${resourceKey}_params`}
          title="Params"
          type={'code'}
          data={interaction.params}
          className="json-rpc-resource params"
        />
      )}
      {interaction.result && (
        <ResourceBlock
          keyBlock={`${resourceKey}_result`}
          title="Result"
          type={'code'}
          data={interaction.result}
          className="json-rpc-resource result"
        />
      )}
    </div>
  );
};
