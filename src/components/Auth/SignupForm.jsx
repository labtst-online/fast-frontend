import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Input from '../Common/Input';
import Button from '../Common/Button';
import ErrorMessage from '../Common/ErrorMessage';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { signup, isLoading, authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
        setFormError("Password must be at least 8 characters long.");
        return;
    }

    const success = await signup(email, password);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div>
      <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-dark-text">
        Create your account
      </h2>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <ErrorMessage message={authError} />
        <ErrorMessage message={formError} />
        <Input
          id="signup-email"
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
          id="signup-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          label="Password"
          placeholder="Password (min. 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={formError && formError.includes("Password must be") ? formError : ""}
          disabled={isLoading}
        />
        <Input
          id="confirm-password"
          name="confirm-password"
          type="password"
          autoComplete="new-password"
          required
          label="Confirm Password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={formError && formError.includes("match") ? formError : ""}
          disabled={isLoading}
        />
        <Button type="submit" variant="primary" className="w-full" isLoading={isLoading} disabled={isLoading}>
          Sign up
        </Button>
         <p className="mt-4 text-center text-sm text-gray-600 dark:text-dark-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              Sign in
            </Link>
          </p>
      </form>
    </div>
  );
};

export default SignupForm;
