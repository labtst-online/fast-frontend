import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-background dark:bg-backgroundDark">
    <Navbar />
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </main>
    <Footer />
  </div>
);

export default MainLayout;
