import { memo, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIsLoggedContext } from '../../utils/contexts/Contexts';

export const ProtecredRouteElement = ({ element: Component, ...props }) => {
  const isLogged = useContext(UserIsLoggedContext);
  const navigate = useNavigate();

  useEffect(() => {
    !isLogged && navigate('/sign-in', { replace: true });
  });
  return isLogged && <Component {...props} />;
};
