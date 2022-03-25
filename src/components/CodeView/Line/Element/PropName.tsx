import React, {FC} from 'react';
import clsx from 'clsx';

interface PropNameProps {
  name: string;
  isKeyShortcut?: boolean;
}

export const PropName: FC<PropNameProps> = React.memo(({name, isKeyShortcut}) => (
  <span>
    <span className={clsx(['name', {'shortcut-key': isKeyShortcut}])}>{name}</span>
    <span className="punctuation-char">: </span>
  </span>
));
