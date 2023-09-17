import { memo, useContext, useState } from 'react';
import { PopUpWithForm } from '../PopupWithForm/PopupWithForm';
import { EditAvatarPopupContext, PopupStateContext } from '../../utils/contexts/Contexts';

export const EditAvatarPopup = memo(({ onUpdateAvatar }) => {
  const { isEditAvatarPopupOpen } = useContext(PopupStateContext);
  const setEditAvatarPopupOpen = useContext(EditAvatarPopupContext);

  const [avatar, setAvatar] = useState('');

  function handleAvatartype(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar,
    });
  }
  console.log(isEditAvatarPopupOpen);
  return (
    <PopUpWithForm
      title="Редактировать профиль"
      name="edit-profile"
      submitText="Сохранить"
      isOpen={isEditAvatarPopupOpen}
      onClose={setEditAvatarPopupOpen}
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
