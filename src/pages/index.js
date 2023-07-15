import './index.css';
import { 
  initialCards,
  validationConfig,
  formInputs
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



const imgPopupRender = new PopupWithImage('.popup_type_image');
const handleCardClick = (link, name) => {
  imgPopupRender.open(link, name)
}
imgPopupRender.setEventListeners();

const editFormValidator = new FormValidator(validationConfig, popupEditProfile);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, popupAddCard);
addFormValidator.enableValidation();

const editPopupForm = new PopupWithForm('.popup_type_edit', (data) => {
  profileInfo.setUserInfo({ 
    name: data.userName, 
    about: data.userAbout})
    editPopupForm.close()
})

popupProfileOpenButton.addEventListener('click', () => {
  editPopupForm.open()
  const profileData = profileInfo.getUserInfo();
  formInputs.nameInput.value = profileData.name;
  formInputs.aboutInput.value = profileData.about;
  editFormValidator.resetFormState();
});

editPopupForm.setEventListeners()

const createCard = (data, selector, submitHandler) => {
  const card = new Card(data, '.element_template', submitHandler);
  const cardElement = card.generateCard();

  return cardElement
}
const addPopupForm = new PopupWithForm('.popup_type_add', (data) => {
    const newCardData =
    {
      name: data.placeName,
      link: data.imageUrl
    };
  const cardElement = createCard(newCardData, '.element_template', handleCardClick);
  
  cardsSection.addItem(cardElement);
  addPopupForm.close()
})

popupAddOpenButton.addEventListener('click', () => {
  addPopupForm.open();
  addFormValidator.resetFormState();
  addFormValidator.disableSubmitButton();
});

addPopupForm.setEventListeners();

const cardsSection = new Section({
  renderer: (item) => {
    const cardElement = createCard(item, '.element_template', handleCardClick);
    
    cardsSection.addItem(cardElement);
  }
}, '.elements__list')

cardsSection.renderItems(initialCards)