import { Header } from './Header/Header';
import { Main } from './Main/Main';
import { Footer } from './Footer/Footer';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { PageNotFound } from './PageNotFound/PageNotFound';
import { SignIn } from './SignIn/SignIn';
import { SignUp } from './SignUp/SignUp';
import { ProtectedRouteElement } from './ProtectedRouteElement/ProtectedRouteElement';
import { auth } from './Authentication/Authentication';

export function App() {
  const [isLogged, setLogged] = useState(false);
  const [headerUserInfo, setHeaderUserInfo] = useState('');

  const navigate = useNavigate();

  function handleSignInSubmit(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((loginToken) => {
        localStorage.setItem('token', loginToken.token);
        setLogged(true);
        navigate('/');
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetch('https://auth.nomoreparties.co/users/me', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => res.json())
        .then((userInfo) => {
          setLogged(true);
          navigate('/');
          setHeaderUserInfo(userInfo.data.email);
        });
    }
  }, [isLogged, navigate]);

  return (
    <div className="App">
      <Header userInfo={headerUserInfo} isLogged={isLogged} setLogged={setLogged} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouteElement isLogged={isLogged}>
              <Main />
            </ProtectedRouteElement>
          }
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn onSubmit={handleSignInSubmit} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
      <script type="module" src="./pages/index.js"></script>
    </div>
  );
}
