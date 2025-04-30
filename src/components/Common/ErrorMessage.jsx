import React from 'react';

const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return (
      <div className="p-3 my-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-300 border border-red-200 dark:border-red-700" role="alert">
        <span className="font-medium">Error:</span> {message}
      </div>
    );
  };
  
  export default ErrorMessage;
  