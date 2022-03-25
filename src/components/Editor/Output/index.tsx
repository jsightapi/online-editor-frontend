import React from 'react';
import ResourceRenderer from './ResourceRenderer';

const classes = {
  root: 'w-6/12 border-l-purple-700 border-2 p-2 overflow-y-auto overflow-x-hidden',
};

const Output = ({parsedContent}: any) => {
  const loaded = !!parsedContent;
  const resources = parsedContent?.resourceMethods
    ? Object.values(parsedContent.resourceMethods)
    : [];

  return loaded ? (
    <div className={classes.root}>
      <ResourceRenderer resources={resources} />
    </div>
  ) : null;
};

export default Output;
