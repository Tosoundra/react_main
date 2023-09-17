import { Header } from './Header/Header';
import { Main } from './Main/Main';
import { Footer } from './Footer/Footer';
import { PopUpWithImage } from './PopupWithImage/PopupWithImage';
import { useCallback, useEffect, useState } from 'react';
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
import { ProtecredRouteElement } from './ProtectedRouteElement/ProtectedRouteElement';
import { auth } from './Authentication/Authentication';
import { ProviderComponent } from './ProviderComponent/ProviderComponent';
import {
  CurrentUserContext,
  EditProfilePopupContext,
  PopupStateContext,
  UserIsLoggedContext,
} from '../utils/contexts/Contexts';

function App() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setCard] = useState({});
  const [selectedCardForDelete, setSelectedCardForDelete] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isLogged, setLogged] = useState(false);
  const [headerUserInfo, setHeaderUserInfo] = useState('');

  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isInitialLoadingPopupOpen, setisInitialLoadingPopupOpen] = useState(true);

  function handleDeleteCard(cardID) {
    setSelectedCardForDelete(cardID);
  }

  function handleDeleteCardClick() {
    setDeleteCardPopupOpen(true);
  }

  // const handleEditProfileClick = useCallback(() => {
  //   setEditProfilePopupOpen(prevState => !prevState);
  // }, []);

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleUpdateUser(userData) {
    api
      .setUserInfo(userData)
      .then(response => response.json())
      .then(updatedUserData => setCurrentUser(updatedUserData));

    setEditProfilePopupOpen(false);
  }

  function handleUpdateAvatar(link) {
    api
      .setUserAvatar(link)
      .then(response => response.json())
      .then(data => console.log(data));

    setEditAvatarPopupOpen(false);
  }

  function handleAddPlaceSubmit(cardInfo) {
    api
      .addCard(cardInfo)
      .then(response => response.json())
      .then(newCard => setCards([...cards, newCard]));

    setAddPlacePopupOpen(false);
  }

  function handleDeleteCardSubmit() {
    api.deleteCard(selectedCardForDelete);
    setCards(cards.filter(item => item._id !== selectedCardForDelete));

    setDeleteCardPopupOpen(false);
  }

  function handleSignInSubmit(email, password) {
    auth
      .login(email, password)
      .then(res => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then(logInToken => {
        localStorage.setItem('token', logInToken.token);
        setLogged(true);
        navigate('/');
      })
      .catch(err => console.log(err));
  }

  const hanldeSelectCard = useCallback(card => {
    setCard(card);
  }, []);

  function hanldeImagePopupOpen() {
    setImagePopupOpen(true);
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

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, user]) => {
        return Promise.all([cards.json(), user.json()]);
      })
      .then(([response1, response2]) => {
        setCards(response1);
        setCurrentUser(response2);
      })
      .finally(() => {
        setisInitialLoadingPopupOpen(false);
      });
  }, []);
  console.log('app components');
  return (
    <div className="App">
      <Header userInfo={headerUserInfo} isLogged={isLogged} logout={setLogged} />
      <Routes>
        <Route
          path="/"
          element={
            <CurrentUserContext.Provider value={currentUser}>
              <UserIsLoggedContext.Provider value={isLogged}>
                <ProviderComponent setEditProfilePopupOpen={setEditProfilePopupOpen}>
                  <ProtecredRouteElement
                    element={Main}
                    cards={cards}
                    onCardDelete={handleDeleteCard}
                  />
                </ProviderComponent>
                <EditProfilePopup
                  setEditProfilePopupOpen={setEditProfilePopupOpen}
                  isEditProfilePopupOpen={isEditProfilePopupOpen}
                />
                {/* <EditProfilePopup
                  isEditProfilePopupOpen={isEditProfilePopupOpen}
                  setEditProfilePopupOpen={handleEditProfileClick}
                /> */}
              </UserIsLoggedContext.Provider>
            </CurrentUserContext.Provider>
          }
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn onSubmit={handleSignInSubmit} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup onAddPlace={handleAddPlaceSubmit} />
      <PopUpWithImage /> */}
      <DeleteCardPopup
        isOpen={isDeleteCardPopupOpen}
        onClose={setDeleteCardPopupOpen}
        onDeleteCard={handleDeleteCardSubmit}
      />

      <Footer />
      {isInitialLoadingPopupOpen && <InitialLoadingPopup />}
      {/* {isImagePopupOpen && (
       
      )} */}
      <script type="module" src="./pages/index.js"></script>
    </div>
  );
}

export default App;
