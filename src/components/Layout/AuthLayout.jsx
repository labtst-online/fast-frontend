import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import ThemeToggle from '../UI/ThemeToggle';

const AuthLayout = ({ children }) => {
  return (
    <div className="bg-gray-50 dark:bg-dark-bg min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
       <div className="absolute top-4 right-4">
           <ThemeToggle />
       </div>
       <div className="mb-8">
            <Link to="/" className="text-3xl font-bold text-blue-600 dark:text-blue-400 hover:opacity-80 transition-opacity">
              FastBoosty
            </Link>
       </div>
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-dark-bg-secondary p-8 rounded-lg shadow-md">
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default AuthLayout;
