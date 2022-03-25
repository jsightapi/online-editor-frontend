import React from 'react';
import clsx from 'clsx';

const classes = {
  base: 'w-auto inline-flex text-white font-semibold rounded-md',
  badge: 'py-2 px-7',
  smallBadge: 'text-xs px-3 py-1',
};

export const Badge = ({children, className = 'bg-green'}: any) => (
  <span className={clsx(classes.base, classes.badge, className)}>{children}</span>
);

export const SmallBadge = ({children, className = 'bg-green'}: any) => (
  <span className={clsx(classes.base, classes.smallBadge, className)}>{children}</span>
);
