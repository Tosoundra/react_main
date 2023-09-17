import React, { memo, useContext, useEffect, useState } from 'react';
import {
  AddPlacePopupContext,
  CurrentUserContext,
  EditProfilePopupContext,
} from '../../utils/contexts/Contexts';

export const Profile = memo(() => {
  const { name, about, avatar } = useContext(CurrentUserContext);
  // const setEditAvatarPopupOpen = useContext(AddPlacePopupContext);
  const setEditProfilePopupOpen = useContext(EditProfilePopupContext);
  // const setAddPlacePopupOpen = useContext(AddPlacePopupContext);

  // function handleAddPlaceClick() {
  //   setAddPlacePopupOpen(true);
  // }

  // function handleEditAvatarClick() {
  //   setEditAvatarPopupOpen(true);
  // }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  return (
    <article className="profile">
      <h1>{Math.random()}</h1>
      <div className="profile__container">
        <div className="image__container">
          {/* <img src={avatar} alt="аватар" className="profile__image" /> */}
          <button
            // onClick={handleEditAvatarClick}
            type="button"
            className="profile__edit-avatar-button transition"
          ></button>
        </div>
        <div className="profile__discription">
          <div className="profile__name-edit-container">
            {/* <h1 className="profile__title">{name}</h1> */}
            <button
              onClick={() => {
                setEditProfilePopupOpen(true);
              }}
              type="button"
              className="profile__edit button transition"
            ></button>
          </div>
          {/* <h2 className="profile__subtitle">{about}</h2> */}
        </div>
      </div>
      <button
        // onClick={handleAddPlaceClick}
        type="button"
        className="profile__add button transition"
      ></button>
    </article>
  );
});
