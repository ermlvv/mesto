import './index.css';
import { 
  initialCards,
  validationConfig,
  formInputs,
  apiConfig
} from "../util/constants.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js" 
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js"
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js"
import PopupWithConfirmation from '../components/popupWithConfirmation.js';

// Попапы и формы 
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const popupAvatarUpdate = document.querySelector('.popup_type_update-avatar');
const popupRemoveCard = document.querySelector('.popup_type_remove-card');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const profileAvatar = document.querySelector('.profile__avatar-wrapper');

const api = new Api(apiConfig);

const profileInfo = new UserInfo({ 
  name: '.profile__info-name',
  about: '.profile__info-about',
  avatar: '.profile__info-avatar'
});

//Валидация попапов
const editFormValidator = new FormValidator(validationConfig, popupEditProfile);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, popupAddCard);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validationConfig, popupAvatarUpdate);
avatarFormValidator.enableValidation();

//Попап обновления аватара
const avatarUpdatePopup = new PopupWithForm('.popup_type_update-avatar', (data) => {
  avatarUpdatePopup.renderPreloader(true, "Сохранение...");
  api.setUserAvatar(data)
  .then(() => {
    profileInfo.setUserAvatar(data.userAvatar);
    avatarUpdatePopup.close();
  })
  .catch((err) => {
    console.error(`Возникла ошибка при обновлении аватара: ${err}`);
  })
  .finally(() => avatarUpdatePopup.renderPreloader(false, "Сохранить"))
});

avatarUpdatePopup.setEventListeners();
profileAvatar.addEventListener('click', () => {
  avatarUpdatePopup.open();
})

//Попап удаления карточки 
const cardPopupRemove = new PopupWithConfirmation('.popup_type_remove-card',
(cardId, cardElement) => {
  cardPopupRemove.renderPreloader(true, "Удаление...");
  api.removeCard(cardId)
  .then(() => {
    cardsSection.removeCard(cardElement)
  })
  .then(() => cardPopupRemove.close())
  .catch(err => console.log(`При удалении карточки возникла ошибка: ${err}`))
  .finally(() => cardPopupRemove.renderPreloader(true, "Да"))
})

cardPopupRemove.setEventListeners();

//Попап просмотра картинка
const imgPopupRender = new PopupWithImage('.popup_type_image');
imgPopupRender.setEventListeners();

//форма редактирования профиля
const editPopupForm = new PopupWithForm('.popup_type_edit', (data) => {
  profileInfo.setUserInfo({ 
    name: data.userName, 
    about: data.userAbout
  });
    editPopupForm.renderPreloader(true, "Сохранение...");
    api.setUserInfo(data)
    .finally(() => editPopupForm.renderPreloader(false, "Сохранить"))
    editPopupForm.close();
})
//открытие попапа редактирования профиля
popupProfileOpenButton.addEventListener('click', () => {
  editPopupForm.open();
  const profileData = profileInfo.getUserInfo();
  formInputs.nameInput.value = profileData.name;
  formInputs.aboutInput.value = profileData.about;
  editFormValidator.resetFormState();
});

editPopupForm.setEventListeners();

//форма добавления новой карточки
const addPopupForm = new PopupWithForm('.popup_type_add', (data) => {
  addPopupForm.renderPreloader(true, "Сохранение...");
    api.newCard(data)
      .then((cardData) => {
        const newCard = createCard(cardData);
        cardsSection.setItem(newCard);
        })
      .then(addPopupForm.close())
      .catch(err => console.log(`Возникла ошибка при добавлении новой карточки: ${err}`))
      .finally(() => addPopupForm.renderPreloader(false, "Сохранить"))
    }
)

//функция создания карточки
const createCard = (cardData) => {
  const card = new Card({
    data: cardData,
    template: '.element_template',
    currentId, 
    handleCardClick: () => imgPopupRender.open(cardData),
    handleCardRemove: 
      cardPopupRemove.open.bind(cardPopupRemove),
    handleCardLike: (cardData) => {
      api.likeCard(cardData._cardId)
      .then(data => {
        card.toggleButton(data)
      })
      .catch(err => console.log(`При лайке возникла ошибка: ${err}`))
    },
    handleCardDislike: (cardData) => {
      api.dislikeCard(cardData._cardId)
      .then(data => {
        card.toggleButton(data)
      })
      .catch(err => console.log(`При дизлайке возникла ошибка: ${err}`))
    }
  });
  
  const cardElement = card.generateCard();

  return cardElement
};

//открытие попапа добавления новой карточки 
popupAddOpenButton.addEventListener('click', () => {
  addPopupForm.open();
  addFormValidator.resetFormState();
  addFormValidator.disableSubmitButton();
});

addPopupForm.setEventListeners();


let cardsSection;
let currentId;

//получение данных с сервера 
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, cardsArr]) => {
    profileInfo.setUserInfo({
      name: data.name,
      about: data.about
    });
    currentId = data._id
    // console.log(currentId)
    profileInfo.setUserAvatar(data.avatar);

    cardsSection = new Section({
      renderer: (item) => {
        const cardElement = createCard(item);
        cardsSection.addItem(cardElement);
      }
    }, '.elements__list')
    cardsSection.renderItems(cardsArr)
  })
  .catch(err => {
    console.log(`Возникла ошибка при загрузке данных с сервера: ${err}`)
  });