import { Link, useNavigate } from 'react-router-dom';
import { SignForm } from '../SignForm/SignForm';
import { auth } from '../Authentication/Authentication';
import { useEffect, useState } from 'react';

export const SignIn = ({ onSubmit }) => {
  return (
    <main className="sign">
      <SignForm title="Войти" submitTitle="Войти" onSubmit={onSubmit} />
      <p className="sign__auth-check-text">
        Нет в системе?{' '}
        <Link to="/sign-up" className="link button transition">
          Зарегистрироваться
        </Link>
      </p>
    </main>
  );
};
