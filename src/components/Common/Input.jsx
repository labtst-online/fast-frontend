import React from 'react';

const Input = ({
    id,
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
    label,
    error,
    required = false,
    className = '',
    ...props
  }) => {
    const baseStyle = 'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm';
    const borderStyle = error
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-400 dark:focus:ring-red-400 dark:focus:border-red-400'
      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400';
    const backgroundStyle = 'bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-dark-text';
  
    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={id || name} className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          id={id || name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${baseStyle} ${borderStyle} ${backgroundStyle} ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id || name}-error` : undefined}
          {...props}
        />
        {error && <p id={`${id || name}-error`} className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
      </div>
    );
  };
  
  export default Input;
