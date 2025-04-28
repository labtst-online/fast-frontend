import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../Common/Button';
import ThemeToggle from '../UI/ThemeToggle';
import LoadingSpinner from '../Common/LoadingSpinner';

const Navbar = () => {
  const { isAuthenticated, user, logout, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const activeClassName = "bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-300";
  const inactiveClassName = "text-gray-700 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700";

  return (
    <nav className="bg-white dark:bg-dark-bg-secondary shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:opacity-80 transition-opacity">
              FastBoosty
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${isActive ? activeClassName : inactiveClassName} px-3 py-2 rounded-md text-sm font-medium`
                }
              >
                Home
              </NavLink>
              {isAuthenticated && (
                 <NavLink
                    to="/feed"
                    className={({ isActive }) =>
                    `${isActive ? activeClassName : inactiveClassName} px-3 py-2 rounded-md text-sm font-medium`
                    }
                >
                    My Posts
                </NavLink>
              )}
            </div>
          </div>

          <div className="flex items-center ml-auto space-x-3">
             <ThemeToggle />
             <div className="relative">
                {isAuthLoading ? (
                    <div className="p-2"><LoadingSpinner size="sm" /></div>
                ) : isAuthenticated && user ? (
                  <div className="flex items-center space-x-3">
                     {/* Display user avatar if available */}
                     {user.avatar_url ? (
                        <Link to="/profile/me" title="View Profile">
                            <img
                                className="h-8 w-8 rounded-full object-cover hover:opacity-80 transition-opacity"
                                src={user.avatar_url}
                                alt="User avatar"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                         </Link>
                     ) : (
                         <Link to="/profile/me" title="View Profile" className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 text-xs font-medium hover:opacity-80 transition-opacity">
                            {/* Placeholder with initials or generic icon */}
                            {user.display_name ? user.display_name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || '?'}
                         </Link>
                     )}
                     {/* Display user name or email or User by default*/}
                     <span className="text-gray-700 dark:text-dark-text-secondary text-sm font-medium hidden sm:block">
                        {user.display_name || user.email || 'User'}
                     </span>
                     <Link to="/posts/new">
                         <Button variant="secondary" size="sm">Create Post</Button>
                     </Link>
                    <Button onClick={handleLogout} variant="ghost" size="sm" title="Logout">
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link to="/login">
                      <Button variant="primary" size="sm">Login</Button>
                    </Link>
                    <Link to="/signup">
                      <Button variant="secondary" size="sm">Sign Up</Button>
                    </Link>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
