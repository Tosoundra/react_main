import { useEffect, useState } from 'react';

export const SignForm = ({ title, submitTitle, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setpasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Заполните данное поле');
  const [passwordError, setPasswordError] = useState('Заполните данное поле');
  const [isFormValid, setFormValid] = useState(true);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  function handleMailInputType(e) {
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    setEmail(e.target.value);
    if (!emailRegex.test(String(e.target.value).toLocaleLowerCase())) {
      setEmailError('Некорректно введен электронный  адрес ');
    } else {
      setEmailError('');
    }
  }

  function handlePasswordInputType(e) {
    setPassword(e.target.value);
    if (e.target.value.length < 4) {
      setPasswordError('Пароль должен состоять минимум из 4 символов');
    } else {
      setPasswordError('');
    }
  }

  function blurHandler(e) {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setpasswordDirty(true);
        break;
    }
  }

  function handleSubmitClick(e) {
    e.preventDefault();
    onSubmit(email, password);
  }

  return (
    <form name="signUp" autoComplete="on" className="sign__form" onSubmit={handleSubmitClick}>
      <h1 className="sign__title">{title}</h1>
      <input
        type="email"
        onChange={handleMailInputType}
        onBlur={blurHandler}
        name="email"
        value={email}
        placeholder="Email"
        required
        className="sign__input"
        pattern=".{5,}"
        title="введите минимум 5 символов"
      />
      <span className="form__input-error author__name-error">{emailDirty && emailError}</span>
      <input
        type="password"
        onChange={handlePasswordInputType}
        onBlur={blurHandler}
        name="password"
        minLength="4"
        maxLength="40"
        value={password}
        placeholder="Пароль"
        required={true}
        className="sign__input"
      />
      <span className="form__input-error author__name-error">{passwordDirty && passwordError}</span>
      <button
        disabled={!isFormValid}
        className={`sign__submit ${isFormValid ? 'button' : ''} transition`}
      >
        {submitTitle}
      </button>
    </form>
  );
};
