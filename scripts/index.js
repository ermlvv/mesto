import { initialCards } from "./constants.js";
import Card from "./Card.js";
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
const cardContainer = document.querySelector('.elements__list')
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
}

const closePopup = (popupToClose) => {
  popupToClose.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
      closePopup(popup);
  }
}

popupProfileOpenButton.addEventListener('click', () => {
  openPopup(popupEditProfile),
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileUserAbout.textContent;
  editFormValidator.resetFormState();
});

popupAddOpenButton.addEventListener('click', () => {
  formElementAdd.reset()
  openPopup(popupAddCard);
  addFormValidator.resetFormState();
  addFormValidator.disableSubmitButton();
});

popupsArr.forEach((item) => {
  item.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
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
  const newCardData =[
    {
      name: placeInput.value,
      link: imageUrlInput.value
    }
  ];
  renderCards(newCardData);
  closePopup(popupAddCard);
  evt.target.reset();
};

formElementAdd.addEventListener('submit', handleFormSubmitAdd);

const createCard = (card) => {
    const newCard = new Card(card, '.element_template', renderImagePopup);
    const cardElement = newCard.generateCard();
    return cardElement;
}

const renderCards = (cards) => {
  cards.forEach((item) => {
    cardContainer.prepend(createCard(item));
  })
}

renderCards(initialCards);

const editFormValidator = new FormValidator(validationConfig, popupEditProfile);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, popupAddCard);
addFormValidator.enableValidation();