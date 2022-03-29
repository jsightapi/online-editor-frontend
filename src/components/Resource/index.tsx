import React, {FC} from 'react';
import {ResourcePathType} from 'api/getResources.model';
import {ResourceMethods} from './ResourceMethods';

interface ResourceProps {
  resource: ResourcePathType;
  resourceKey: string;
  style?: React.CSSProperties;
  index: number;
}

export const Resource: FC<ResourceProps> = ({resource, resourceKey, style, index}) => (
  <div className="resource-wrapper" style={style}>
    <h3>{resource.path}</h3>
    {resource.methods && (
      <ResourceMethods resourceKey={resourceKey} methods={resource.methods} index={index} />
    )}
  </div>
);
