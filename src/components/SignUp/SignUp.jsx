import { Link, useNavigate } from 'react-router-dom';
import { SignForm } from '../SignForm/SignForm';
import { auth } from '../Authentication/Authentication';
import { InfoToolTip } from '../InfoToolTip/InfoToolTip';
import registrationError from '../../images/signUpError.svg';
import registrationSuccess from '../../images/signUpSuccess.svg';
import { useEffect, useState } from 'react';

export const SignUp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  function handleCloseClick() {
    setIsOpen(false);
  }

  function handleSubmit(email, password) {
    auth
      .registration(email, password)
      .then(res => {
        if (!res.ok) {
          setStatus(false);

          throw new Error();
        }
        new Promise(resolve => {
          setTimeout(() => {
            resolve(navigate('/sign-in'));
          }, 3000);
        });
        setStatus(true);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsOpen(true);
      });
  }

  return (
    <main className="sign">
      <SignForm title="Регистрация" submitTitle="Зарегистрироваться" onSubmit={handleSubmit} />
      <p className="sign__auth-check-text">
        Уже зарегистрированы?{' '}
        <Link to="/sign-in" className="link button transition">
          Войти
        </Link>
      </p>
      {status ? (
        <InfoToolTip
          img={registrationSuccess}
          title="Вы успешно зарегистрировались!"
          isOpen={isOpen}
          onClose={handleCloseClick}
        />
      ) : (
        <InfoToolTip
          img={registrationError}
          title="  Что-то пошло не так!
Попробуйте ещё раз."
          isOpen={isOpen}
          onClose={handleCloseClick}
        />
      )}
    </main>
  );
};
