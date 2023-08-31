export const profileSelector = {
  name: 'profile__title',
  occupation: 'profile__subtitle',
  avatar: 'profile__image',
};
export const formElements = {
  formInput: '.popup__input',
  formSubmit: '.popup__submit',
  inputError: '.form__input-error',
  submitEnable: 'button',
};

export const popupAndPopupElements = {
  popupDeleteCardSelector: 'popup__delete-card',
  popupEditAvatarSelector: 'popup__edit-avatar',
  popupWithImage: 'popup__card',
  popupAddPlace: 'popup__add-place',
  popupEditProfile: 'popup__edit-profile',
};

export const setInputUserInfo = data => {
  nameInput.value = data.name;
  occupationInput.value = data.occupation;
};
export const cardSelectors = {
  counter: '.places__like-counter',
  likeButton: '.places__like',
  cardName: '.places__name',
  cardImage: '.places__image',
  deleteButton: '.places__trash-icon',
  cardTemplate: '.places-grid__element',
};

// ------------------------------------

export const profileEditButton = document.querySelector('.profile__edit');
export const avatarEditButton = document.querySelector('.profile__edit-avatar-button');
export const nameInput = document.querySelector('.popup__name');
export const occupationInput = document.querySelector('.popup__occupation');
export const formEditProfile = document.querySelector('.form__edit-profile');
export const formAddPlace = document.querySelector('.popup__form-add-place');
export const formEditAvatar = document.querySelector('.popup__form-edit-avatar');
export const buttonAddPlace = document.querySelector('.profile__add');
export const inputPlaceName = document.querySelector('.popup__input-place-name');
export const inputPlaceURL = document.querySelector('.popup__input-place-url');
export const listPlaces = document.querySelector('.places-grid');
export const profileName = document.querySelector('.profile__title');
export const profileOccupation = document.querySelector('.profile__subtitle');
