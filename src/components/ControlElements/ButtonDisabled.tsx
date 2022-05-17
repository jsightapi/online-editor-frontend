import React, {memo} from 'react';

interface ButtonDisabledProps {
  iconName: string;
}

export const ButtonDisabled = memo(({iconName}: ButtonDisabledProps) => (
  <button className="disabled">
    <i className={iconName} />
    <i className="icon-arrow-down" />
  </button>
));
