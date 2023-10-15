import { memo, useCallback, useContext, useEffect, useState } from 'react';
import { PopUpWithForm } from '../PopupWithForm/PopupWithForm';
import {
  CurrentUserContext,
  EditProfilePopupContext,
  PopupStateContext,
} from '../../utils/contexts/Contexts';

export const EditProfilePopup = memo(({ isOpen, onClose, onSubmit, currentUser }) => {
  console.log(currentUser);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleNameType(e) {
    setName(e.target.value);
  }

  function handleDescriptionType(e) {
    setDescription(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({
      name,
      about: description,
    });
    onClose(false);
  };

  useEffect(() => {
    currentUser.name && setName(currentUser.name);
    currentUser.about && setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopUpWithForm
      title="Редактировать профиль"
      name="edit-profile"
      submitText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        onChange={handleNameType}
        minLength="2"
        maxLength="40"
        name="name"
        id="author__name"
        value={name}
        placeholder="Имя"
        className="popup__input popup__name"
        required
      />
      <span className="form__input-error author__name-error"></span>
      <input
        type="text"
        onChange={handleDescriptionType}
        minLength="2"
        maxLength="200"
        name="about"
        id="author__description"
        value={description}
        placeholder="О себе"
        className="popup__input popup__occupation"
        required
      />
      <span className="form__input-error author__description-error"></span>
    </PopUpWithForm>
  );
});
