import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProtectedRouteElement = memo(({ children, isLogged }) => {
  const navigate = useNavigate();
  useEffect(() => {
    !isLogged && navigate('/sign-in', { replace: true });
  }, [isLogged]);
  return isLogged && <>{children}</>;
});
