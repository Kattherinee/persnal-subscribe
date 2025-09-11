import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import type { JSX } from 'react';

export const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated || role !== 'admin') {
    return <Navigate to="/signin-admin" replace />;
  }
  return children;
};
