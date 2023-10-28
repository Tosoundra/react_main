import { memo, useState } from 'react';
import { PopUpWithForm } from '../PopupWithForm/PopupWithForm';

export const EditAvatarPopup = memo(({ onSubmit, isOpen, onClose }) => {
  const [avatar, setAvatar] = useState('');

  function inputOnChangeHandler(e) {
    setAvatar(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      avatar,
    });
    onClose(false);
  };

  return (
    <PopUpWithForm
      title="Редактировать аватар"
      name="edit-avatar"
      submitText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        type="url"
        onChange={inputOnChangeHandler}
        name="link"
        value={avatar}
        id="avatar__url"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input-avatar-url"
        required
      />
      <span className="form__input-error avatar__url-error"></span>
    </PopUpWithForm>
  );
});
