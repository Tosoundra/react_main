import { memo } from 'react';
import { PopUpWithForm } from '../PopupWithForm/PopupWithForm';

export const DeleteCardPopup = memo(({ isOpen, onClose, onDeleteCard }) => {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }
  return (
    <PopUpWithForm
      title="Вы уверены?"
      name="delete-card"
      submitText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
});
