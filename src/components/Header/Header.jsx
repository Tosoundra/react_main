import { memo, useRef } from 'react';
import logoPath from '../../images/logo.svg';
import { auth } from '../Authentication/Authentication';
import { useNavigate } from 'react-router-dom';

export const Header = memo(({ userInfo, isLogged, logout }) => {
  const navigate = useNavigate();

  function handleButtonExitClick() {
    auth.logout();
    navigate('/sign-in', { replace: true });
    logout(false);
    console.log(localStorage.getItem('token'));
  }

  return (
    <header className="header">
      <img src={logoPath} alt="Logo" className="logo" />
      {isLogged && (
        <>
          <span
            style={{ textAlign: 'right', marginRight: '25px' }}
            className="sign__auth-check-text"
          >
            {userInfo}
          </span>
          <span
            onClick={handleButtonExitClick}
            style={{ color: '#A9A9A9', fontSize: '18px', fontWeight: '400' }}
            className="button transition"
          >
            Выйти
          </span>
        </>
      )}
    </header>
  );
});
