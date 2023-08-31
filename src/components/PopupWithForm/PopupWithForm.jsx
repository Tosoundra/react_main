const PopUpWithForm = ({ isOpen, name, title, submitText, children, onClose, onSubmit }) => {
  
  function handleCloseClick() {
    onClose(false);
  }

  return (
    <aside
      id="popup-edit"
      className={`${isOpen ? 'popup' : ''} popup_closed popup__${name} transition`}
    >
      <div className="popup__form-container">
        <form
          onSubmit={onSubmit}
          name={`popup__form-${name}`}
          noValidate
          className="popup__form form__edit-profile"
        >
          <h2 className="popup__title">{title}</h2>
          <>{children}</>
          <button type="submit" className="popup__submit button transition">
            {submitText}
          </button>
        </form>
        <button onClick={handleCloseClick} className="popup__close-button transition button" />
      </div>
    </aside>
  );
};

export default PopUpWithForm;
