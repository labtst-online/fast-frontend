import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../Common/Button';
import ThemeToggle from '../UI/ThemeToggle';
import LoadingSpinner from '../Common/LoadingSpinner';

const Navbar = () => {
  const { isAuthenticated, user, logout, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const linkBase = "px-3 py-2 rounded-md text-sm font-medium transition";
  const active = "bg-secondary text-main dark:bg-secondaryDark dark:text-mainDark";
  const inactive = "text-text hover:bg-background dark:text-textDark dark:hover:bg-secondaryDark";

  return (
    <nav className="bg-background dark:bg-gray-800 shadow sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-bold text-main dark:text-mainDark hover:opacity-80 transition-opacity">
          Labtst-Online
        </Link>

        <div className="hidden md:flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
          >
            Home
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to="/feed"
              className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
            >
              My Posts
            </NavLink>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <ThemeToggle />
          {authLoading ? (
            <LoadingSpinner size="sm" />
          ) : isAuthenticated && user ? (
            <div className="flex items-center space-x-3">
              {user.avatar_url ? (
                <Link to="/profile/me">
                  <img
                    src={user.avatar_url}
                    alt="avatar"
                    className="h-8 w-8 rounded-full object-cover hover:opacity-80 transition-opacity"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </Link>
              ) : (
                <Link to="/profile/me" className="h-8 w-8 rounded-full bg-secondary dark:bg-secondaryDark flex items-center justify-center text-main dark:text-mainDark text-sm">
                  {user.display_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || '?'}
                </Link>
              )}
              <span className="hidden sm:block text-text dark:text-textDark font-medium">
                {user.display_name || user.email || 'User'}
              </span>
              <Link to="/posts/new">
                <Button variant="secondary" size="sm">Create</Button>
              </Link>
              <Button onClick={handleLogout} variant="ghost" size="sm" title="Logout">
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login"><Button variant="primary" size="sm">Login</Button></Link>
              <Link to="/signup"><Button variant="secondary" size="sm">Sign Up</Button></Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
