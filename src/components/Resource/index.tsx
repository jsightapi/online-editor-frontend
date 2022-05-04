import React from 'react';
import {ResourcePathType} from 'api/getResources.model';
import {ResourceMethods} from './ResourceMethods';

interface ResourceProps {
  resource: ResourcePathType;
  resourceKey: string;
  style?: React.CSSProperties;
  index: number;
}

export const Resource = ({resource, resourceKey, style, index}: ResourceProps) => (
  <div className="resource-wrapper" style={style}>
    <h3>{resource.path}</h3>
    {resource.methods && (
      <ResourceMethods resourceKey={resourceKey} methods={resource.methods} index={index} />
    )}
  </div>
);
