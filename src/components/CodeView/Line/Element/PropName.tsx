import React from 'react';
import clsx from 'clsx';
import {wrapInQuotes} from 'utils/wrapInQuotes';

interface PropNameProps {
  name: string;
  isKeyShortcut?: boolean;
}

export const PropName = React.memo(({name, isKeyShortcut}: PropNameProps) => (
  <span>
    <span className={clsx(['name', {'shortcut-key': isKeyShortcut}])}>{wrapInQuotes(name)}</span>
    <span className="punctuation-char">: </span>
  </span>
));
