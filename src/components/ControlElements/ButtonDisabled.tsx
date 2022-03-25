import React, {FC} from 'react';

interface ButtonDisabledProps {
  iconName: string;
}

export const ButtonDisabled: FC<ButtonDisabledProps> = React.memo(({iconName}) => (
  <button className="disabled">
    <i className={iconName} />
    <i className="icon-arrow-down" />
  </button>
));
