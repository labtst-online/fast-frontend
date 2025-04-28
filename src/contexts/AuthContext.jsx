import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { login as apiLogin, signup as apiSignup, logout as apiLogout } from '../services/authService';
import { getMyProfile } from '../services/profileService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const fetchUserProfile = useCallback(async () => {
      const currentToken = localStorage.getItem('accessToken');
      if (!currentToken) {
          setUser(null);
          setToken(null);
          setIsLoading(false);
          return;
      }
      setIsLoading(true);
      try {
          const profileData = await getMyProfile();
          setUser(profileData);
          setToken(currentToken);
          setAuthError(null);
      } catch (error) {
          console.error("Failed to fetch user profile:", error);
          localStorage.removeItem('accessToken');
          setToken(null);
          setUser(null);
      } finally {
          setIsLoading(false);
      }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const login = async (email, password) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const data = await apiLogin(email, password);
      setToken(data.access_token);
      await fetchUserProfile();
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      const errorMsg = error.response?.data?.detail || "Login failed. Please check your credentials.";
      setAuthError(errorMsg);
      setUser(null);
      setToken(null);
      localStorage.removeItem('accessToken');
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (email, password) => {
      setIsLoading(true);
      setAuthError(null);
      try {
          await apiSignup(email, password);
          console.log("Signup successful, attempting auto-login...");
          const loginSuccess = await login(email, password);
          if (!loginSuccess) {
             setAuthError("Signup successful, but auto-login failed. Please log in manually.");
          }
          
          return loginSuccess;
      } catch (error) {
          console.error("Signup failed:", error.response?.data || error.message);
          const errorMsg = error.response?.data?.detail || "Signup failed. Please try again.";
          setAuthError(errorMsg);
          setUser(null);
          setToken(null);
          localStorage.removeItem('accessToken');
          setIsLoading(false);
          return false;
      }
  };


  const logout = async () => {
    setIsLoading(true);
    setAuthError(null);
    try {
        await apiLogout();
    } catch(error) {
        console.error("Logout API call failed:", error);
    } finally {
        setUser(null);
        setToken(null);
        setIsLoading(false);
        console.log("User logged out (client-side state cleared).");
    }
  };


  const value = useMemo(() => ({
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    authError,
    login,
    signup,
    logout,
    reloadUserProfile: fetchUserProfile,
  }), [user, token, isLoading, authError, fetchUserProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
