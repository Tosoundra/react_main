import { Header } from './Header/Header';
import { Main } from './Main/Main';
import { Footer } from './Footer/Footer';
import { PopUpWithImage } from './PopupWithImage/PopupWithImage';
import { useEffect, useState } from 'react';
import { api } from './API';

import { EditProfilePopup } from './EditProfilePopup/EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup/EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup/AddPlacePopup';
import { DeleteCardPopup } from './DeleteCardPopup/DeleteCardPopup';
import { InitialLoadingPopup } from './InitialLoadingPopup/InitialLoadingPopup';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { PageNotFound } from './PageNotFound/PageNotFound';
import { SignIn } from './SignIn/SignIn';
import { SignUp } from './SignUp/SignUp';
import { ProtectedRouteElement } from './ProtectedRouteElement/ProtectedRouteElement';
import { auth } from './Authentication/Authentication';
import { ProviderComponent } from './ProviderComponent/ProviderComponent';
import { UserIsLoggedContext } from '../utils/contexts/Contexts';

function App() {
  const [isLogged, setLogged] = useState(false);
  const [headerUserInfo, setHeaderUserInfo] = useState('');

  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isInitialLoadingPopupOpen, setisInitialLoadingPopupOpen] = useState(true);

  function handleSignInSubmit(email, password) {
    auth
      .login(email, password)
      .then(res => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then(loginToken => {
        localStorage.setItem('token', loginToken.token);
        setLogged(true);
        navigate('/');
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetch('https://auth.nomoreparties.co/users/me', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(res => res.json())
        .then(userInfo => {
          setLogged(true);
          navigate('/');
          setHeaderUserInfo(userInfo.data.email);
        });
    }
  }, [isLogged]);

  console.log('app components');
  return (
    <div className="App">
      <Header userInfo={headerUserInfo} isLogged={isLogged} logout={setLogged} />
      <Routes>
        <Route
          path="/"
          element={
            <UserIsLoggedContext.Provider value={isLogged}>
              <ProviderComponent>
                <ProtectedRouteElement isLogged={isLogged}>
                  <Main />
                </ProtectedRouteElement>
              </ProviderComponent>
            </UserIsLoggedContext.Provider>
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

export default App;
