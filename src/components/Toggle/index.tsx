import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import './Toggle.styles.scss';

interface ToggleProps {
  leftOption?: string;
  rightOption?: string;
  defaultOption?: string | boolean;
  isEquivalent?: boolean;
  onChange?: (value: boolean) => void;
}

export const Toggle = ({
  leftOption = 'OFF',
  rightOption = 'ON',
  defaultOption = false,
  isEquivalent,
  onChange,
}: ToggleProps) => {
  const [checked, setChecked] = useState(defaultOption === true || defaultOption === rightOption);

  useEffect(() => {
    onChange && onChange(checked);
  }, [checked, onChange]);

  return (
    <div className="toggle">
      {leftOption}
      <label className="toggle-switch">
        <input type="checkbox" checked={checked} onChange={() => setChecked((prev) => !prev)} />
        <span className={clsx('toggle-slider', 'round', isEquivalent && 'equivalent')}></span>
      </label>
      {rightOption}
    </div>
  );
};
