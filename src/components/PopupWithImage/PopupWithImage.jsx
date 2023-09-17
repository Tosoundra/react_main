import { memo, useContext, useEffect } from 'react';
import { PopUpWithImageContext, PopupStateContext } from '../../utils/contexts/Contexts';

export const PopUpWithImage = memo(() => {
  const setImagePopupOpen = useContext(PopUpWithImageContext);
  const { selectedCard, isImagePopupOpen, isEditProfilePopupOpen } = useContext(PopupStateContext);

  function handleCloseClick() {
    setImagePopupOpen(false);
  }

  return (
    <aside
      id="popup-image"
      className={`${isImagePopupOpen ? 'popup' : ''} popup_closed popup__card transition`}
    >
      <div className="popup__form-container">
        <figure className="popup__container">
          <img
            src={selectedCard.link}
            alt="Здесь должна быть выбранная картинка, но видимо, что-то пошло не так"
            className="popup__image"
          />
          <figcaption className="popup__caption">{selectedCard.name}</figcaption>
        </figure>
        <button
          onClick={handleCloseClick}
          className="popup-image__close-button popup__close-button transition button"
        />
      </div>
    </aside>
  );
});
