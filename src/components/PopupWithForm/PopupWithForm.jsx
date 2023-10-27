import { memo, useEffect, useRef } from 'react';

export const PopUpWithForm = memo(
  ({ isOpen, name, title, submitText, children, onClose, onSubmit }) => {
    useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);

    return (
      <aside className={`${isOpen ? 'popup' : ''} popup_closed popup__${name} transition`}>
        <div className="popup__form-container">
          <form
            onSubmit={onSubmit}
            name={`popup__form-${name}`}
            noValidate
            className="popup__form form__edit-profile">
            <h2 className="popup__title">{title}</h2>
            <>{children}</>
            <button type="submit" className="popup__submit button transition">
              {submitText}
            </button>
          </form>
          <button
            onClick={() => {
              onClose(false);
            }}
            className="popup__close-button transition button"
          />
        </div>
      </aside>
    );
  },
);
