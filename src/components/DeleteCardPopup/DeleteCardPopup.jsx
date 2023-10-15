import { memo, useCallback, useContext } from 'react';
import { PopUpWithForm } from '../PopupWithForm/PopupWithForm';
import { DeleteCardPopupContext, PopupStateContext } from '../../utils/contexts/Contexts';

export const DeleteCardPopup = memo(({ onDeleteCard }) => {
  const setDeleteCardPopupOpen = useContext(DeleteCardPopupContext);
  const { isDeleteCardPopupOpen } = useContext(PopupStateContext);
  console.log('delete');
  const handleSubmit = useCallback(e => {
    e.preventDefault();
    onDeleteCard();
  }, []);
  return (
    <PopUpWithForm
      title="Вы уверены?"
      name="delete-card"
      submitText="Да"
      isOpen={isDeleteCardPopupOpen}
      onClose={setDeleteCardPopupOpen}
      onSubmit={handleSubmit}
    />
  );
});
