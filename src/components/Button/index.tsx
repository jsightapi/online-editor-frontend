import React from 'react';
import clsx from 'clsx';
import './Button.styles.scss';

interface ButtonProps {
  icon?: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  title?: string;
}

export const Button = ({
  children,
  disabled = false,
  className = '',
  onClick,
  icon,
  title,
}: ButtonProps) => (
  <button
    disabled={disabled}
    title={title}
    className={clsx('btn', className, {disabled, 'only-icon': !children})}
    onClick={onClick}
  >
    {icon && <i className={`icon-${icon}`} />}
    {children}
  </button>
);
