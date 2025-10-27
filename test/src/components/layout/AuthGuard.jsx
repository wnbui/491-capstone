import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LoadingSpinner } from '../common/LoadingSpinner';

export const AuthGuard = ({ children, currentPage, onNavigate }) => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user && currentPage !== 'login' && currentPage !== 'register') {
        onNavigate('login');
      } else if (user && (currentPage === 'login' || currentPage === 'register')) {
        onNavigate('main');
      }
    }
  }, [user, loading, currentPage, onNavigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return children;
};