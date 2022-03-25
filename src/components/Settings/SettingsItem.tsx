import React, {FC} from 'react';
import clsx from 'clsx';

interface SettingsItemProps {
  title: string;
  firstTab: string[];
  secondTab: string[];
  onClickFirst(): void;
  onClickSecond(): void;
  value: boolean;
}

export const SettingsItem: FC<SettingsItemProps> = ({
  title,
  value,
  firstTab,
  secondTab,
  onClickFirst,
  onClickSecond,
}) => (
  <div className="item">
    <div className="settings-group-title">{title}</div>
    <div className="settings-group d-flex">
      <button className={clsx([{active: value}])} onClick={onClickFirst}>
        <i className={`icon-${firstTab[0]}`} />
        {firstTab[1]}
      </button>
      <button className={clsx([{active: !value}])} onClick={onClickSecond}>
        <i className={`icon-${secondTab[0]}`} />
        {secondTab[1]}
      </button>
    </div>
  </div>
);
