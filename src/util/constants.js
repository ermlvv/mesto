export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const formInputs = {
  nameInput: document.querySelector(".popup__input_type_name"),
  aboutInput: document.querySelector(".popup__input_type_about"),
  avatarInput: document.querySelector(".popup__input_type_avatar"),
};

export const apiConfig = {
  url: "https://mesto.nomoreparties.co/v1/cohort-71",
  token: "819a001d-5b0e-4a83-a5db-fddf974e88e5",
};

export const popupEditProfile = document.querySelector(".popup_type_edit");
export const popupAddCard = document.querySelector(".popup_type_add");
export const popupAvatarUpdate = document.querySelector(
  ".popup_type_update-avatar"
);
export const popupProfileOpenButton = document.querySelector(
  ".profile__edit-button"
);
export const popupAddOpenButton = document.querySelector(
  ".profile__add-button"
);
export const profileAvatar = document.querySelector(".profile__avatar-wrapper");

export let cardsSection;
export let currentId;
