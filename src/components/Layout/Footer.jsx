import React from 'react';

const Footer = () => {
    return (
      <footer className="bg-gray-100 dark:bg-dark-bg-secondary mt-auto py-4 px-4 sm:px-6 lg:px-8 text-center border-t border-gray-200 dark:border-dark-border">
        <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
          &copy; {new Date().getFullYear()} FastBoosty. I hope All rights reserved. It is just a pet-project. Not for production.
        </p>
      </footer>
    );
  };
  
  export default Footer;
