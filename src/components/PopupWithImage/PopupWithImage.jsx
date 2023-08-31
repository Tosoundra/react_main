const PopUpWithImage = ({ card, state, onClose }) => {
  function handleCloseClick() {
    onClose(false);
  }
  return (
    <aside
      id="popup-image"
      className={`${state ? 'popup' : ''} popup_closed popup__card transition`}
    >
      <div className="popup__form-container">
        <figure className="popup__container">
          <img
            src={card.link}
            alt="Здесь должна быть выбранная картинка, но видимо, что-то пошло не так"
            className="popup__image"
          />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
        <button
          onClick={handleCloseClick}
          className="popup-image__close-button popup__close-button transition button"
        />
      </div>
    </aside>
  );
};

export default PopUpWithImage;
