import React from 'react';

const Textarea = ({
    id,
    name,
    value,
    onChange,
    placeholder,
    label,
    error,
    required = false,
    rows = 3,
    className = '',
    ...props
  }) => {
    const baseStyle = 'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm';
    const borderStyle = error
      ? 'border-statement focus:ring-statement focus:border-statement dark:border-statementDark dark:focus:ring-statementDark dark:focus:border-statementDark'
      : 'border-secondary dark:border-secondaryDark focus:ring-main focus:border-main dark:focus:ring-mainDark dark:focus:border-mainDark';
    const backgroundStyle = 'bg-background dark:bg-backgroundDark text-text dark:text-textDark';
  
    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={id || name} className="block text-sm font-medium text-text dark:text-textDark mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`${baseStyle} ${borderStyle} ${backgroundStyle} ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id || name}-error` : undefined}
          {...props}
        />
        {error && <p id={`${id || name}-error`} className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
      </div>
    );
  };
  
  export default Textarea;
