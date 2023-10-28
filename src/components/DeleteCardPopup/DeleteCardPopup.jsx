import { memo } from 'react';
import { PopUpWithForm } from '../PopupWithForm/PopupWithForm';

export const DeleteCardPopup = memo(({ handleDeleteCardSubmit, isOpen, onClose }) => {
  function handleSubmit(e) {
    e.preventDefault();
    handleDeleteCardSubmit();
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
