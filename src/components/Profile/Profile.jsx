import React, { memo, useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { HandleContexts } from '../../contexts/HandleContexts';

const Profile = () => {
  const userData = useContext(CurrentUserContext);

  const { name, about, avatar } = userData;

  const handleContext = useContext(HandleContexts);

  return (
    <article className="profile">
      <div className="profile__container">
        <div className="image__container">
          <img src={avatar} alt="аватар" className="profile__image" />
          <button
            onClick={handleContext.handleEditAvatarClick}
            type="button"
            className="profile__edit-avatar-button transition"
          ></button>
        </div>
        <div className="profile__discription">
          <div className="profile__name-edit-container">
            <h1 className="profile__title">{name}</h1>
            <button
              onClick={handleContext.handleEditProfileClick}
              type="button"
              className="profile__edit button transition"
            ></button>
          </div>
          <h2 className="profile__subtitle">{about}</h2>
        </div>
      </div>
      <button
        onClick={handleContext.handleAddPlaceClick}
        type="button"
        className="profile__add button transition"
      ></button>
    </article>
  );
};

export default Profile;
