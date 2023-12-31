import { memo, useEffect } from 'react';

export const PopUpWithImage = memo(({ isOpen, onClose, selectedCard }) => {
  function handleCloseClick() {
    onClose(false);
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <aside
      id="popup-image"
      className={`${isOpen ? 'popup' : ''} popup_closed popup__card transition`}>
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
