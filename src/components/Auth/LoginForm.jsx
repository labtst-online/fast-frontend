import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Input from '../Common/Input';
import Button from '../Common/Button';
import ErrorMessage from '../Common/ErrorMessage';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div>
      <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-dark-text">
        Sign in to your account
      </h2>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <ErrorMessage message={authError} />
        <Input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          label="Email address"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <Input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          label="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        {/* TODO: Add "Forgot password?" link here */}
        <div className="text-sm text-right">
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              Forgot your password?
            </a>
        </div>


        <Button type="submit" variant="primary" className="w-full" isLoading={isLoading} disabled={isLoading}>
          Sign in
        </Button>
         <p className="mt-4 text-center text-sm text-gray-600 dark:text-dark-text-secondary">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              Sign up
            </Link>
          </p>
      </form>
    </div>
  );
};

export default LoginForm;
