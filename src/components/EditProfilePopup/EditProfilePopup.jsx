import { memo, useContext, useEffect, useState } from 'react';
import { PopUpWithForm } from '../PopupWithForm/PopupWithForm';
import {
  CurrentUserContext,
  EditProfilePopupContext,
  PopupStateContext,
} from '../../utils/contexts/Contexts';

export const EditProfilePopup = memo(
  ({ onUpdateUser, setEditProfilePopupOpen, isEditProfilePopupOpen }) => {
    const currentUser = useContext(CurrentUserContext);
    // const { isEditProfilePopupOpen } = useContext(PopupStateContext);
    // const setEditProfilePopupOpen = useContext(EditProfilePopupContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleNameType(e) {
      setName(e.target.value);
    }

    function handleDescriptionType(e) {
      setDescription(e.target.value);
    }

    function handleSubmit(e) {
      e.preventDefault();

      onUpdateUser({
        name,
        about: description,
      });
    }
    // console.log(isEditProfilePopupOpen);
    // useEffect(() => {
    //   currentUser.name && setName(currentUser.name);
    //   currentUser.about && setDescription(currentUser.about);
    // }, [currentUser, isEditProfilePopupOpen]);

    return (
      <PopUpWithForm
        title="Редактировать профиль"
        name="edit-profile"
        submitText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={setEditProfilePopupOpen}
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
  },
);
