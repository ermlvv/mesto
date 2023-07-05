import { initialCards } from "./constants.js";
import Card from "./card.js";
import FormValidator from "./FormValidator.js" 

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupAddOpenButton = document.querySelector('.profile__add-button'); 
const formElementEdit = document.querySelector('.popup__form_type_edit');
const formElementAdd = document.querySelector('.popup__form_type_add');
const profileUserName = document.querySelector('.profile__info-name');
const profileUserAbout = document.querySelector('.profile__info-about');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');
const popupsArr = Array.from(popups);
const placeInput = document.querySelector('.popup__input_type_place');
const imageUrlInput = document.querySelector('.popup__input_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const openPopup = (popupToOpen) => {
  popupToOpen.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
  document.addEventListener('click', closePopupByButton);
}
const closePopup = (popupToClose) => {
  popupToClose.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
  document.removeEventListener('click', closePopupByButton);
}

const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
      closePopup(popup);
  }
}

const closePopupByButton = (evt) => {
  const popup = document.querySelector('.popup_opened');
  const popupCloseButton = popup.querySelector('.popup__close-button');
  if (evt.target === popupCloseButton) {
    closePopup(popup);
  };
};

popupProfileOpenButton.addEventListener('click', () => {
  openPopup(popupEditProfile),
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileUserAbout.textContent;
  editFormValidator.resetFormState();
});

popupAddOpenButton.addEventListener('click', () => {
  placeInput.value = '';
  imageUrlInput.value = '';
  openPopup(popupAddCard);
  addFormValidator.resetFormState();
  addFormValidator.disableSubmitButton();
});

popupsArr.forEach((item) => {
  item.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(item);
    }
  });
});

const handleFormSubmitEdit = (evt) => {
  evt.preventDefault();
  profileUserName.textContent = nameInput.value;
  profileUserAbout.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

formElementEdit.addEventListener('submit', handleFormSubmitEdit);

const renderImagePopup = (link, name) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageTitle.textContent = name; 
  openPopup(imagePopup);
};

const handleFormSubmitAdd = (evt) => {
  evt.preventDefault();
  const data =
    {
      name: placeInput.value,
      link: imageUrlInput.value
    };
  const cardEl = new Card (data, '.element_template');
  const cardElement = cardEl.generateCard();

  document.querySelector('.elements__list').prepend(cardElement);
  closePopup(popupAddCard);
  evt.target.reset();
};

formElementAdd.addEventListener('submit', handleFormSubmitAdd);

initialCards.forEach((item) => {
  const card = new Card (item, '.element_template', renderImagePopup)
  const cardElement = card.generateCard()

  document.querySelector('.elements__list').prepend(cardElement);
})

const editFormValidator = new FormValidator(validationConfig, popupEditProfile);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, popupAddCard);
addFormValidator.enableValidation();