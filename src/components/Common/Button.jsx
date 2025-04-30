import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  className = '',
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark-bg transition ease-in-out duration-150';

  const variantStyles = {
    primary: 'bg-main text-white hover:bg-secondary focus:ring-secondary disabled:bg-secondary dark:bg-mainDark dark:hover:bg-secondaryDark dark:focus:ring-secondaryDark dark:disabled:bg-secondaryDark dark:disabled:text-textDark',
    secondary: 'bg-secondary text-text hover:bg-main focus:ring-main disabled:bg-main dark:bg-secondaryDark dark:text-textDark dark:hover:bg-mainDark dark:focus:ring-mainDark dark:disabled:bg-mainDark dark:disabled:text-textDark',
    danger: 'bg-statement text-white hover:bg-main focus:ring-main disabled:bg-secondary dark:bg-statementDark dark:hover:bg-mainDark dark:focus:ring-mainDark dark:disabled:bg-secondaryDark dark:disabled:text-textDark',
    ghost: 'bg-transparent text-text hover:bg-secondary dark:text-textDark dark:hover:bg-backgroundDark focus:ring-statement disabled:opacity-50',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const disabledStyle = disabled || isLoading ? 'opacity-60 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyle} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" />
          <span className="ml-2">Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
