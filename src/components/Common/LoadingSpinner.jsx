import React from 'react';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={`
      animate-spin rounded-full
      border-t-transparent border-solid
      border-blue-500 dark:border-blue-400
      ${sizeClasses[size] || sizeClasses['md']}
    `} role="status" aria-label="Loading"></div>
  );
};

export default LoadingSpinner;
