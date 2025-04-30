import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ThemeToggle from '../UI/ThemeToggle';

const AuthLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-backgroundDark py-12 px-4 sm:px-6 lg:px-8">
    <div className="absolute top-4 right-4">
      <ThemeToggle />
    </div>
    <Link to="/" className="mb-8 text-3xl font-bold text-main dark:text-mainDark hover:opacity-80 transition-opacity">
      FastBoosty
    </Link>
    {children || <Outlet />}
  </div>
);

export default AuthLayout;
