import React from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import Button from '../components/Common/Button';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const HomePage = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-dark-text">Welcome to FastBoosty!</h1>
      <p className="text-lg text-gray-600 dark:text-dark-text-secondary mb-8 max-w-2xl mx-auto">
        The platform designed to connect creators with their fans and build communities.
      </p>
      {isLoading ? (
         <LoadingSpinner />
      ) : isAuthenticated && user ? (
        <div className="space-y-4">
          <p className="text-xl">Hello, <span className="font-semibold">{user.display_name || user.email}</span>!</p>
          <div className="flex justify-center items-center space-x-4">
              <Link to="/feed">
                <Button variant="primary" size="lg">View My Posts</Button>
              </Link>
              <Link to="/posts/new">
                <Button variant="secondary" size="lg">Create a New Post</Button>
              </Link>
          </div>
        </div>
      ) : (
        <div className="space-x-4">
          <Link to="/login">
            <Button variant="primary" size="lg">Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="secondary" size="lg">Sign Up</Button>
          </Link>
        </div>
      )}
       <div className="mt-16 border-t border-gray-200 dark:border-dark-border pt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-dark-text">Featured Content</h2>
            <p className="text-gray-500 dark:text-dark-text-secondary">Featured creators and posts will appear here soon!</p>
       </div>
    </div>
  );
};

export default HomePage;
