import PopUpWithForm from '../PopupWithForm/PopupWithForm';

const DeleteCardPopup = ({ isOpen, onClose, onDeleteCard }) => {
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
};

export default DeleteCardPopup;
