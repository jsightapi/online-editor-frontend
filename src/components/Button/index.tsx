import clsx from 'clsx';
import './Button.styles.scss';

interface ButtonProps {
  icon?: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const Button = ({
  children,
  disabled = false,
  className = '',
  onClick,
  icon,
}: ButtonProps) => (
  <button
    disabled={disabled}
    className={clsx('btn', className, {disabled})}
    onClick={onClick}
  >
    {icon && <i className={`icon-${icon}`} />}
    {children}
  </button>
);
