import { useEffect } from 'react';
import { useFirebaseAuth } from './firebase/context/auth.context';
import { Navigate, useLocation } from 'react-router-dom';

export const AuthenticatedRoute = ({ children }: { children: any }) => {
  const { user } = useFirebaseAuth();
  const location = useLocation();

  const callBackUrl = location.pathname + location.search;

  const navigateTo = callBackUrl ? `/login?callBackUrl=${callBackUrl}` : '/login';

  if (!user) return <Navigate to={navigateTo} replace />;
  else return <>{children}</>;
};
