import { memo, useEffect, useState } from 'react';
import { Card } from '../Card/Card';
import { Profile } from '../Profile/Profile';
import { api } from '../API';
import { InitialLoadingPopup } from '../InitialLoadingPopup/InitialLoadingPopup';

export const Main = memo(({ open }) => {
  const [cards, setCards] = useState([]);
  const [selectedCardForDelete, setCardForDelete] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isInitialLoadingPopupOpen, setIsInitialLoadingPopupOpen] = useState(true);

  function handleDeleteCardSubmit() {
    api.deleteCard(selectedCardForDelete);
    setCards(cards.filter((item) => item._id !== selectedCardForDelete));
  }

  function handleUpdateUser(userData) {
    api
      .setUserInfo(userData)
      .then((response) => response.json())
      .then((updatedUserData) => setCurrentUser(updatedUserData));
  }

  function handleAddPlaceSubmit(cardInfo) {
    api
      .addCard(cardInfo)
      .then((response) => response.json())
      .then((newCard) => setCards([...cards, newCard]));
  }

  function handleUpdateAvatar(link) {
    api
      .setUserAvatar(link)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([responseCard, responseUser]) => {
        return Promise.all([responseCard.json(), responseUser.json()]);
      })
      .then(([cards, user]) => {
        setCards(cards);
        setCurrentUser(user);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsInitialLoadingPopupOpen(false);
      });
  }, []);

  return (
    <main className="main">
      <Profile
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
        onAddPlace={handleAddPlaceSubmit}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <section className="elements">
        <ul className="places-grid list">
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              setCardForDelete={setCardForDelete}
              handleDeleteCardSubmit={handleDeleteCardSubmit}
              open={open}
              currentUser={currentUser}
            />
          ))}
        </ul>
      </section>
      {isInitialLoadingPopupOpen && <InitialLoadingPopup />}
    </main>
  );
});
