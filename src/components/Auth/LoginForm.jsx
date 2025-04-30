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

  const handleSubmit = async e => {
    e.preventDefault();
    if (await login(email, password)) navigate(from, { replace: true });
  };

  return (
    <div className="flex items-center justify-center min-h-full py-12 px-4 sm:px-6 lg:px-8 bg-background dark:bg-backgroundDark">
      <div className="max-w-md w-full space-y-8 bg-background dark:bg-backgroundDark p-8 rounded-2xl shadow-lg">
        <h2 className="mt-6 text-center text-3xl font-bold text-text dark:text-textDark">Sign in to your account</h2>
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

            <div className="flex justify-end text-sm">
              <Link to="/forgot-password" className="text-secondary dark:text-secondaryDark hover:underline">Forgot password?</Link>
            </div>

            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading} disabled={isLoading}>
              Sign in
            </Button>
            <p className="mt-4 text-center text-sm text-secondary dark:text-secondaryDark">
              Don't have an account? <Link to="/signup" className="font-medium hover:underline">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
  );
};

export default LoginForm;
