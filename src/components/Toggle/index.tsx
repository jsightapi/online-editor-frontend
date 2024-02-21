import React from 'react';
import clsx from 'clsx';
import './Toggle.styles.scss';

interface ToggleProps {
  leftOption?: string;
  rightOption?: string;
  isEquivalent?: boolean;
}

export const Toggle = ({leftOption = 'OFF', rightOption = 'ON', isEquivalent}: ToggleProps) => (
  <div className="toggle">
    {leftOption}
    <label className="toggle-switch">
      <input type="checkbox" />
      <span className={clsx('toggle-slider', 'round', isEquivalent && 'equivalent')}></span>
    </label>
    {rightOption}
  </div>
);
