import { memo, useCallback, useState } from 'react';
import {
  SetCardContext,
  PopupStateContext,
  UserIsLoggedContext,
  EditAvatarPopupContext,
  EditProfilePopupContext,
  AddPlacePopupContext,
  PopUpWithImageContext,
} from '../../utils/contexts/Contexts';

export const ProviderComponent = memo(({ children, setEditProfilePopupOpen }) => {
  const [selectedCard, setCard] = useState({});
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  // const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  console.log('Provider Compontnts');
  return (
    <SetCardContext.Provider value={setCard}>
      <AddPlacePopupContext.Provider value={setAddPlacePopupOpen}>
        <EditAvatarPopupContext.Provider value={setEditAvatarPopupOpen}>
          <EditProfilePopupContext.Provider value={setEditProfilePopupOpen}>
            <PopUpWithImageContext.Provider value={setImagePopupOpen}>
              {/* <PopupStateContext.Provider */}
                {/* value={{ */}
                  {/* isEditProfilePopupOpen, */}
                {/* }} */}
              {/* > */}
                {children}
              {/* </PopupStateContext.Provider> */}
            </PopUpWithImageContext.Provider>
          </EditProfilePopupContext.Provider>
        </EditAvatarPopupContext.Provider>
      </AddPlacePopupContext.Provider>
    </SetCardContext.Provider>
  );
});
