import { useRef, useState } from 'react';
import PopUpWithForm from '../PopupWithForm/PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const input = useRef();
  const [avatar, setAvatar] = useState('');

  function handleAvatartype() {
    setAvatar(input.current.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar,
    });
    console.log(avatar)
  }

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
        type="url"
        onChange={handleAvatartype}
        name="link"
        ref={input}
        // value={avatar}
        id="avatar__url"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input-avatar-url"
        required
      />
      <span className="form__input-error avatar__url-error"></span>
    </PopUpWithForm>
  );
};

export default EditAvatarPopup;
