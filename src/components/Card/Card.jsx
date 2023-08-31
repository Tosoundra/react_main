import { memo, useContext, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { HandleContexts } from '../../contexts/HandleContexts';
import { api } from '../API';

const Card = memo(({ card, onCardDelete }) => {
  const currentUser = useContext(CurrentUserContext);

  const [likeCount, setLikeCount] = useState(card.likes.length);
  const [isLiked, setIsLiked] = useState(card.likes.some(card => card._id === currentUser._id));
  const isOwn = card.owner._id === currentUser._id;

  const handleCardClickContext = useContext(HandleContexts);
  const { setCard, setImagePopupOpen } = handleCardClickContext.cardClick;

  function handleCardClick() {
    setCard(card);
    setImagePopupOpen(true);
  }

  function handleDeleteClick() {
    handleCardClickContext.handleDeleteCardClick();
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

export default Card;
