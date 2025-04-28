import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import useAuth from './hooks/useAuth';

import MainLayout from './components/Layout/MainLayout';
import AuthLayout from './components/Layout/AuthLayout';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';
import FeedPage from './pages/FeedPage';
import CreatePostPage from './pages/CreatePostPage';
import NotFoundPage from './pages/NotFoundPage';
import LoadingSpinner from './components/Common/LoadingSpinner';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    const currentLocation = window.location.pathname + window.location.search;
    return <Navigate to="/login" state={{ from: currentLocation }} replace />;
  }

  return children;
};


function AppContent() {
  return (
     <Routes>
        <Route element={<MainLayout><Outlet /></MainLayout>}>
          <Route index element={<HomePage />} />
          <Route path="profile/me" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="profile/edit" element={<ProtectedRoute><ProfileEditPage /></ProtectedRoute>} />
          <Route path="feed" element={<ProtectedRoute><FeedPage /></ProtectedRoute>} />
          <Route path="posts/new" element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
        </Route>

        <Route element={<AuthLayout><Outlet /></AuthLayout>}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
     </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
