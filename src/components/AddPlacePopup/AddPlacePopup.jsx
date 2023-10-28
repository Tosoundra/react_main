import { useEffect, useState } from 'react';
import { PopUpWithForm } from '../PopupWithForm/PopupWithForm';

export const AddPlacePopup = ({ onSubmit, isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function inputOnChangeHandle(event, setterFunctionName) {
    setterFunctionName(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      name,
      link,
    });
    onClose(false);
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopUpWithForm
      title="Новое место"
      name="add-place"
      submitText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(event) => {
          inputOnChangeHandle(event, setName);
        }}
        id="place__name"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        className="popup__input popup__input-place-name"
        required
      />
      <span className="form__input-error place__name-error"></span>
      <input
        type="url"
        name="link"
        value={link}
        onChange={(event) => {
          inputOnChangeHandle(event, setLink);
        }}
        id="place__link"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input-place-url"
        required
      />
      <span className="form__input-error place__link-error"></span>
    </PopUpWithForm>
  );
};
