import './index.css';
import { 
  initialCards,
  validationConfig,
} from "../util/constants.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js" 
import Popup from "../components/Popup.js"
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js"
import PopupWithForm from "../components/PopupWithForm.js";

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupAddOpenButton = document.querySelector('.profile__add-button'); 

const profileInfo = new UserInfo({ 
  name: '.profile__info-name',
  about: '.profile__info-about'
});

const editPopup = new Popup('.popup_type_edit');
const addPopup = new Popup('.popup_type_add');
const imgPopup = new Popup('.popup_type_image');
imgPopup.setEventListeners();
const imgPopupRender = new PopupWithImage('.popup_type_image');
const handleCardClick = (link, name) => {
  imgPopupRender.open(link, name)
}

const editFormValidator = new FormValidator(validationConfig, popupEditProfile);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, popupAddCard);
addFormValidator.enableValidation();

const editPopupForm = new PopupWithForm('.popup_type_edit', (data) => {
  profileInfo.setUserInfo({ 
    name: data.userName, 
    about: data.userAbout})
})

popupProfileOpenButton.addEventListener('click', () => {
  editPopup.open()
  profileInfo.getUserInfo({ 
    name: '.popup__input_type_name',
    about: '.popup__input_type_about' 
  });
  editPopup.setEventListeners();
  editFormValidator.resetFormState();
});
editPopupForm.setEventListeners()

const addPopupForm = new PopupWithForm('.popup_type_add', (data) => {
    const newCardData =
    {
      name: data.placeName,
      link: data.imageUrl
    };
  const newCard = new Card(newCardData, '.element_template', handleCardClick);
  const newCardElement = newCard.generateCard();
  cardsList.addItem(newCardElement);
})

popupAddOpenButton.addEventListener('click', () => {
  addPopup.open();
  addPopup.setEventListeners();
  addFormValidator.resetFormState();
  addFormValidator.disableSubmitButton();
});

addPopupForm.setEventListeners()

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.element_template', handleCardClick);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }
}, '.elements__list')

cardsList.renderItems()