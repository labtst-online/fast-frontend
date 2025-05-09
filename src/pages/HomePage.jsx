import React from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import Button from '../components/Common/Button';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const HomePage = () => {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <section className="text-center py-16 bg-background dark:bg-backgroundDark">
      <h2 className="text-4xl font-bold mb-6 text-text dark:text-textDark">
        Welcome to Labtst-Online!
      </h2>
      <p className="text-lg mb-8 text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
        Connect with creators, build communities, and explore featured content.
      </p>

      {isLoading ? (
        <LoadingSpinner />
      ) : isAuthenticated ? (
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/feed">
            <Button variant="primary" size="lg">View Posts</Button>
          </Link>
          <Link to="/posts/new">
            <Button variant="secondary" size="lg">New Post</Button>
          </Link>
        </div>
      ) : (
        <div className="flex justify-center gap-4">
          <Link to="/login">
            <Button variant="primary" size="lg">Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="secondary" size="lg">Sign Up</Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default HomePage;
