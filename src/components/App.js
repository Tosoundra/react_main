import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import PopUpWithForm from './PopupWithForm/PopupWithForm';
import PopUpWithImage from './PopupWithImage/PopupWithImage';
import { useEffect, useState } from 'react';
import { api } from './API';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { HandleContexts } from '../contexts/HandleContexts';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup/DeleteCardPopup';
import InitialLoadingPopup from './InitialLoadingPopup/InitialLoadingPopup';

function App() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setCard] = useState({});
  const [selectedCardForDelete, setSelectedCardForDelete] = useState({});
  const [currentUser, setCurrentUser] = useState({});

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

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

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
      .then(data => console.log(data))

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

  const cardClick = {
    setCard,
    setImagePopupOpen,
  };

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

 
  return (
    <div className="App">
      <Header />
      <HandleContexts.Provider
        value={{
          handleEditProfileClick,
          handleAddPlaceClick,
          handleEditAvatarClick,
          handleDeleteCardClick,
          cardClick,
        }}
      >
        <CurrentUserContext.Provider value={currentUser}>
          <Main cards={cards} onCardDelete={handleDeleteCard} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={setEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={setEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={setAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
          />
          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={setDeleteCardPopupOpen}
            onDeleteCard={handleDeleteCardSubmit}
          />
        </CurrentUserContext.Provider>
      </HandleContexts.Provider>
      <Footer />
      {isInitialLoadingPopupOpen && <InitialLoadingPopup isOpen={isInitialLoadingPopupOpen} />}
      {isImagePopupOpen && (
        <PopUpWithImage card={selectedCard} state={isImagePopupOpen} onClose={setImagePopupOpen} />
      )}
      <script type="module" src="./pages/index.js"></script>
    </div>
  );
}

export default App;
