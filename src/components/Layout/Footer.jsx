import React from 'react';

const Footer = () => (
  <footer className="bg-gradient-to-r from-main to-secondary \
                     dark:from-mainDark dark:to-secondaryDark \
                     mt-auto py-6">
    <div className="container mx-auto px-4 text-center">
      <p className="text-sm font-light text-text dark:text-textDark">
        &copy; {new Date().getFullYear()} FastBoosty. I hope all rights reserved. It is just a pet-project. Not for production.
      </p>
    </div>
  </footer>
);

export default Footer;
