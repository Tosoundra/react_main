import { memo, useEffect, useMemo, useState } from 'react';
import {
  SetCardContext,
  PopupStateContext,
  EditAvatarPopupContext,
  EditProfilePopupContext,
  AddPlacePopupContext,
  PopUpWithImageContext,
  DeleteCardPopupContext,
  SelectDeleteCardContext,
} from '../../utils/contexts/Contexts';
import { api } from '../API';

export const ProviderComponent = memo(({ children }) => {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const [isInitialLoadingPopupOpen, setisInitialLoadingPopupOpen] = useState(true);
  const [selectedCardForDelete, setSelectedCardForDelete] = useState({});

  const [selectedCard, setCard] = useState({});
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);

  const handleClickCard = useMemo(
    () => ({
      setCard,
      setImagePopupOpen,
    }),
    [],
  );
  console.log('ProviderComponent');

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, user]) => {
        return Promise.all([cards.json(), user.json()]);
      })
      .then(([response1, response2]) => {
        setCards(response1);
        setCurrentUser(response2);
      })
      .finally(() => {
        setisInitialLoadingPopupOpen(false);
      });
  }, []);

  return (
    <SetCardContext.Provider value={handleClickCard}>
      <AddPlacePopupContext.Provider value={setAddPlacePopupOpen}>
        <EditAvatarPopupContext.Provider value={setEditAvatarPopupOpen}>
          <EditProfilePopupContext.Provider value={setEditProfilePopupOpen}>
            {/* <PopUpWithImageContext.Provider value={setImagePopupOpen}> */}
            <DeleteCardPopupContext.Provider value={setDeleteCardPopupOpen}>
              {/* <SelectDeleteCardContext.Provider value={setSelectedCardForDelete}> */}
              <PopupStateContext.Provider
                value={{
                  isEditProfilePopupOpen,
                  selectedCard,
                  isImagePopupOpen,
                  isAddPlacePopupOpen,
                  isEditAvatarPopupOpen,
                  isDeleteCardPopupOpen,
                }}
              >
                {children}
              </PopupStateContext.Provider>
              {/* </SelectDeleteCardContext.Provider> */}
            </DeleteCardPopupContext.Provider>
            {/* </PopUpWithImageContext.Provider> */}
          </EditProfilePopupContext.Provider>
        </EditAvatarPopupContext.Provider>
      </AddPlacePopupContext.Provider>
    </SetCardContext.Provider>
  );
});
