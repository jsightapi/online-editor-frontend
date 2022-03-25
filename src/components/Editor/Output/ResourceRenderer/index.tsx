import React from 'react';
import Meta from './Meta';
import Divider from './Divider';
import Responses from './Responses';

const ResourceRenderer = ({resources}: any) => {
  return (
    <div className="grid gap-y-8">
      {resources.map((resource: any, key: any) => (
        <div key={key.toString()}>
          <Meta data={resource} />
          <Divider />
          <Responses data={resource.responses} tags={resource.tags} />
        </div>
      ))}
    </div>
  );
};

export default ResourceRenderer;
