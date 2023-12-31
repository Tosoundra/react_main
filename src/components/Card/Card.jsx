import { memo, useState } from 'react';

import { api } from '../API';
import { CreatingPortalComponent } from '../CreatingPortalElement/CreatingPortalComponent';
import { PopUpWithImage } from '../PopupWithImage/PopupWithImage';
import { DeleteCardPopup } from '../DeleteCardPopup/DeleteCardPopup';

export const Card = memo(({ card, currentUser, setCardForDelete, handleDeleteCardSubmit }) => {
  const [selectedCard, setCard] = useState({});
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);

  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);

  const [likeCount, setLikeCount] = useState(card.likes.length);
  const [isLiked, setIsLiked] = useState(card.likes.some((card) => card._id === currentUser._id));
  const isOwn = card.owner._id === currentUser._id;

  function handleCardClick() {
    setCard(card);
    setImagePopupOpen(true);
  }

  function handleDeleteClick() {
    setDeleteCardPopupOpen(true);
    setCardForDelete(card._id);
  }

  function handleCardLike() {
    setIsLiked(!isLiked);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((response) => response.json())
      .then((card) => setLikeCount(card.likes.length));
  }

  return (
    <>
      <li className="places-grid__element">
        <img
          onClick={handleCardClick}
          src={card.link}
          alt="здесь должна быть картинка"
          className="places__image"
        />
        {isOwn && (
          <button
            onClick={handleDeleteClick}
            type="button"
            className="places__trash-icon button transition"></button>
        )}
        <div className="places__container">
          <span className="places__name">{card.name}</span>
          <div className="places__like-container">
            <button
              onClick={handleCardLike}
              type="button"
              className={`${isLiked ? 'places__like_active' : 'places__like'}  button transition`}
            />
            <span className="places__like-counter">{likeCount}</span>
          </div>
        </div>
      </li>
      <CreatingPortalComponent
        isOpen={isImagePopupOpen}
        onClose={setImagePopupOpen}
        selectedCard={selectedCard}>
        <PopUpWithImage />
      </CreatingPortalComponent>

      <CreatingPortalComponent
        isOpen={isDeleteCardPopupOpen}
        onClose={setDeleteCardPopupOpen}
        handleDeleteCardSubmit={handleDeleteCardSubmit}>
        <DeleteCardPopup />
      </CreatingPortalComponent>
    </>
  );
});
