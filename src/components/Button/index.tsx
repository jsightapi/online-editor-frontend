import {FC} from 'react';
import clsx from 'clsx';
import './Button.styles.scss';

interface ButtonType {
  icon?: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Button: FC<ButtonType> = ({
  children,
  disabled = false,
  className = '',
  onClick,
  icon,
}) => (
  <button
    disabled={disabled}
    className={clsx('btn', className, {_disabled: disabled})}
    onClick={onClick}
  >
    <i className={`icon-${icon}`} />
    {children}
  </button>
);
