import React from 'react';
import clsx from 'clsx';
import {wrapInQuotes} from 'utils/wrapInQuotes';

interface PropNameProps {
  name: string;
  isKeyShortcut?: boolean;
  wrappedInQuotes?: boolean;
}

export const PropName = React.memo(
  ({name, isKeyShortcut, wrappedInQuotes = true}: PropNameProps) => (
    <span>
      <span className={clsx(['name', {'shortcut-key': isKeyShortcut}])}>
        {!isKeyShortcut ? (wrappedInQuotes ? wrapInQuotes(name) : name) : name}
      </span>
      <span className="punctuation-char">: </span>
    </span>
  )
);
