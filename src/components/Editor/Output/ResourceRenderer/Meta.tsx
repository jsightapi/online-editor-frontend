import React from 'react';
import {Badge} from '../Badge';

const classes = {root: 'flex items-center'};

const Meta = ({data}: any) => {
  const classNameByMethod = {
    GET: 'bg-violet-500',
    DELETE: 'bg-red',
    POST: 'bg-green',
    PUT: 'bg-blue-500',
    PATCH: 'bg-pink-500',
  } as any;
  const badgeClassName = classNameByMethod?.[data.httpMethod];

  return (
    <div className={classes.root}>
      <Badge className={badgeClassName}>{data.httpMethod}</Badge>
      <div className="pl-5" />
      <span>{data.path}</span>
    </div>
  );
};

export default Meta;
