import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Common/Button';

const NotFoundPage = () => {
  return (
    <div className="text-center py-16 flex flex-col items-center">
      <svg className="w-16 h-16 text-statement dark:text-statementDark mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
      <h1 className="text-6xl font-bold text-statement dark:text-statementDark mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-text dark:text-textDark mb-6">Page Not Found</h2>
      <p className="text-secondary dark:text-secondaryDark mb-8 max-w-md">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">Go Back Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
