
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function AuthGuard({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }


  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}