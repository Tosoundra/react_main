import { memo, useContext, useState } from 'react';

import { api } from '../API';
import {
  CurrentUserContext,
  PopUpWithImageContext,
  SetCardContext,
} from '../../utils/contexts/Contexts';

export const Card = memo(({ card, onCardDelete, open }) => {
  const currentUser = useContext(CurrentUserContext);

  const [likeCount, setLikeCount] = useState(card.likes.length);
  const [isLiked, setIsLiked] = useState(card.likes.some(card => card._id === currentUser._id));
  const isOwn = card.owner._id === currentUser._id;
  const setImagePopupOpen = useContext(PopUpWithImageContext);
  const setCard = useContext(SetCardContext);
  function handleCardClick() {
    setCard(card);
    setImagePopupOpen(true);
  }

  function handleDeleteClick() {
    // cardClickHandlers.handleDeleteCardClick();
    onCardDelete(card._id);
  }

  function handleCardLike() {
    setIsLiked(!isLiked);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then(response => response.json())
      .then(card => setLikeCount(card.likes.length));
  }

  return (
    <li className="places-grid__element">
      <h1>{Math.random()}</h1>
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
          className="places__trash-icon button transition"
        ></button>
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
  );
});