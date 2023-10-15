import { useCallback, useContext, useEffect, useState } from 'react';
import { PopUpWithForm } from '../PopupWithForm/PopupWithForm';
import { AddPlacePopupContext, PopupStateContext } from '../../utils/contexts/Contexts';

export const AddPlacePopup = ({ onSubmit, isOpen, onClose }) => {
  console.log('add place');
  const setAddPlacePopupOpen = useContext(AddPlacePopupContext);
  const { isAddPlacePopupOpen } = useContext(PopupStateContext);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleCardNametype(e) {
    setName(e.target.value);
  }

  function handleCardLinktype(e) {
    setLink(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({
      name,
      link,
    });
    onClose(false);
  };

  useEffect(() => {
    setName('');
    setLink('');
  }, [isAddPlacePopupOpen]);

  return (
    <PopUpWithForm
      title="Новое место"
      name="add-place"
      submitText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleCardNametype}
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
        onChange={handleCardLinktype}
        id="place__link"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input-place-url"
        required
      />
      <span className="form__input-error place__link-error"></span>
    </PopUpWithForm>
  );
};
