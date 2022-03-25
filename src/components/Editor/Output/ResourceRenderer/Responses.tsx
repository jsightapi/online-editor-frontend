import React from 'react';
import {SmallBadge} from '../Badge';
import ResourceBody from './ResponseBody';

function propertiesToJSON(properties: any) {
  const json = {} as any;

  properties &&
    Object.entries(properties).forEach(([key, value]) => (json[key] = (value as any).scalarValue));

  return json;
}

const Responses = ({data, tags}: any) => {
  const tagsString = tags?.length ? tags.join(',') : '';

  return (
    <div className="grid gap-y-6">
      {data?.length
        ? data.map((response: any, key: any) => {
            const badgeClassName = response?.code >= 500 ? 'bg-red' : 'bg-green';
            const body = response?.body.schema.content.properties;
            const bodyJSON = propertiesToJSON(body);

            return (
              <div key={key.toString()}>
                <div className="bg-dark-delta p-2 flex items-center">
                  <SmallBadge className={badgeClassName}>{response.code}</SmallBadge>
                  <div className="pl-7" />
                  <span>{tagsString}</span>
                </div>
                {Object.keys(bodyJSON).length ? (
                  <ResourceBody content={JSON.stringify(bodyJSON, null, 2)} />
                ) : null}
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Responses;
