import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';
import { useAdminStore } from '../store/adminStore';

export const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated)();

  if (!isAuthenticated) {
    return <Navigate to="/signin-admin" replace />;
  }
  return children;
};
