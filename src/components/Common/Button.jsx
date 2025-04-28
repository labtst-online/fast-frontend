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
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400 dark:disabled:bg-blue-700 dark:disabled:text-gray-300',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 disabled:bg-gray-100 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-500 dark:disabled:bg-gray-800 dark:disabled:text-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-400 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-400 dark:disabled:bg-red-800 dark:disabled:text-gray-300',
    ghost: 'bg-transparent text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 focus:ring-gray-400 disabled:opacity-50',
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
