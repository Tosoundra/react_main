import React, { memo, useState } from 'react';
import { EditProfilePopup } from '../EditProfilePopup/EditProfilePopup';
import { CreatingPortalComponent } from '../CreatingPortalElement/CreatingPortalComponent';
import { EditAvatarPopup } from '../EditAvatarPopup/EditAvatarPopup';
import { AddPlacePopup } from '../AddPlacePopup/AddPlacePopup';

export const Profile = memo(({ currentUser, onUpdateUser, onUpdateAvatar, onAddPlace }) => {
  const { name, about, avatar } = currentUser;

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

  return (
    <article className="profile">
      <div className="profile__container">
        <div className="image__container">
          <img src={avatar} alt="аватар" className="profile__image" />
          <button
            onClick={() => {
              setEditAvatarPopupOpen(true);
            }}
            type="button"
            className="profile__edit-avatar-button transition"></button>
        </div>
        <div className="profile__description">
          <div className="profile__name-edit-container">
            <h1 className="profile__title">{name}</h1>
            <button
              onClick={() => {
                setEditProfilePopupOpen(true);
              }}
              type="button"
              className="profile__edit button transition"></button>
          </div>
          <h2 className="profile__subtitle">{about}</h2>
        </div>
      </div>
      <button
        onClick={() => {
          setAddPlacePopupOpen(true);
        }}
        type="button"
        className="profile__add button transition"></button>
      <>
        <CreatingPortalComponent
          isOpen={isEditAvatarPopupOpen}
          onClose={setEditAvatarPopupOpen}
          onSubmit={onUpdateAvatar}>
          <EditAvatarPopup />
        </CreatingPortalComponent>

        <CreatingPortalComponent
          isOpen={isEditProfilePopupOpen}
          onClose={setEditProfilePopupOpen}
          onSubmit={onUpdateUser}
          currentUser={currentUser}>
          <EditProfilePopup />
        </CreatingPortalComponent>

        <CreatingPortalComponent
          isOpen={isAddPlacePopupOpen}
          onClose={setAddPlacePopupOpen}
          onSubmit={onAddPlace}>
          <AddPlacePopup />
        </CreatingPortalComponent>
      </>
    </article>
  );
});
