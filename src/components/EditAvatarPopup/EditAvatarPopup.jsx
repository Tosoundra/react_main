import { memo, useCallback, useContext, useMemo, useState } from 'react';
import { PopUpWithForm } from '../PopupWithForm/PopupWithForm';
import { EditAvatarPopupContext, PopupStateContext } from '../../utils/contexts/Contexts';

export const EditAvatarPopup = memo(({ onSubmit, isOpen, onClose }) => {
  const [avatar, setAvatar] = useState('');

  function handleAvatartype(e) {
    setAvatar(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({
      avatar,
    });
    onClose(false);
  };

  console.log(isOpen);
  return (
    <PopUpWithForm
      title="Редактировать аватар"
      name="edit-avatar"
      submitText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        onChange={handleAvatartype}
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
