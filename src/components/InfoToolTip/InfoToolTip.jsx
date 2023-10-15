import { useEffect, useState } from 'react';

export const InfoToolTip = ({ img, title, isOpen, onClose }) => {
  return (
    <aside className={`${isOpen ? 'popup' : ''} popup_closed transition`}>
      <div className="popup__form-container">
        <form
          // name={`popup__form-${name}`}
          className="popup__form form__edit-profile"
        >
          <img src={img} style={{ marginTop: '60px', height: '120px' }} />
          <h2 className="popup__title">{title}</h2>
        </form>
        <button onClick={onClose} className="popup__close-button transition button" />
      </div>
    </aside>
  );
};
