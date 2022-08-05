import React from 'react';
import {HttpInteractionType} from 'types';

interface ResourceProps {
  resource: HttpInteractionType;
  resourceKey: string;
  index: number;
}

export const Resource = ({resource, resourceKey, index}: ResourceProps) => (
  <div className="resource-wrapper">
    <h3>{resource.path}</h3>
    {/*{resource.methods && (*/}
    {/*  <HttpMethods resourceKey={resourceKey} methods={resource.methods} index={index} />*/}
    {/*)}*/}
  </div>
);
