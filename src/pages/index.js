import "./index.css";
import {
  popupEditProfile,
  popupAddCard,
  popupAvatarUpdate,
  popupProfileOpenButton,
  popupAddOpenButton,
  profileAvatar,
  validationConfig,
  formInputs,
  apiConfig,
} from "../util/constants.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/popupWithConfirmation.js";

let cardsSection;
let currentId;

const api = new Api(apiConfig);

const profileInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  aboutSelector: ".profile__info-about",
  avatarSelector: ".profile__info-avatar",
});

//Валидация попапов
const editFormValidator = new FormValidator(validationConfig, popupEditProfile);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, popupAddCard);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(
  validationConfig,
  popupAvatarUpdate
);
avatarFormValidator.enableValidation();

//Попап обновления аватара
const avatarUpdatePopup = new PopupWithForm(
  ".popup_type_update-avatar",
  (data) => {
    avatarUpdatePopup.renderPreloader('Сохранение...');
    api
      .setUserAvatar(data)
      .then(() => {
        profileInfo.setUserAvatar(data.userAvatar);
        avatarUpdatePopup.close();
      })
      .catch((err) => {
        console.error(`Возникла ошибка при обновлении аватара: ${err}`);
      })
      .finally(() => avatarUpdatePopup.renderPreloader('Сохранить'));
  }
);

avatarUpdatePopup.setEventListeners();

//Попап удаления карточки
const cardPopupRemove = new PopupWithConfirmation(
  ".popup_type_remove-card",
  (card) => {
    cardPopupRemove.renderPreloader("Удаление...");
    api
      .removeCard(card.getId())
      .then(() => {
        card.removeCard()
      })
      .then(() => cardPopupRemove.close())
      .catch((err) =>
        console.log(`При удалении карточки возникла ошибка: ${err}`)
      )
      .finally(() => cardPopupRemove.renderPreloader("Да"));
  }
);

cardPopupRemove.setEventListeners();

//Попап просмотра картинка
const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

//форма редактирования профиля
const editPopupForm = new PopupWithForm(".popup_type_edit", (data) => {
  editPopupForm.renderPreloader("Сохранение...");
  api
    .setUserInfo(data)
    .then((data) => {
      profileInfo.setUserInfo({
        name: data.name,
        about: data.about,
      });
      editPopupForm.close();
    })
    .finally(() => editPopupForm.renderPreloader("Сохранить"));
});

editPopupForm.setEventListeners();

//форма добавления новой карточки
const addPopupForm = new PopupWithForm(".popup_type_add", (data) => {
  addPopupForm.renderPreloader("Сохранение...");
  api
    .newCard(data)
    .then((cardData) => {
      const newCard = createCard(cardData);
      cardsSection.prependItem(newCard);
    })
    .then(() => addPopupForm.close())
    .catch((err) =>
      console.log(`Возникла ошибка при добавлении новой карточки: ${err}`)
    )
    .finally(() => addPopupForm.renderPreloader("Сохранить"));
});

//функция создания карточки
const createCard = (cardData) => {
  const card = new Card({
    data: cardData,
    template: ".element_template",
    currentId,
    handleCardClick: () => imagePopup.open(cardData),
    handleCardRemove: cardPopupRemove.open.bind(cardPopupRemove),
    handleCardLike: (card) => {
      api
        .likeCard(card.getId())
        .then((data) => {
          card.updateLike(data.likes);
        })
        .catch((err) => console.log(`При лайке возникла ошибка: ${err}`));
    },
    handleCardDislike: (card) => {
      api
        .dislikeCard(card.getId())
        .then((data) => {
          card.updateLike(data.likes);
        })
        .catch((err) => console.log(`При дизлайке возникла ошибка: ${err}`));
    },
  });

  const cardElement = card.generateCard();

  return cardElement;
};

addPopupForm.setEventListeners();

//получение данных с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, cardsArr]) => {
    profileInfo.setUserInfo({
      name: data.name,
      about: data.about,
    });
    currentId = data._id;
    // console.log(currentId)
    profileInfo.setUserAvatar(data.avatar);

    cardsSection = new Section(
      {
        renderer: (item) => {
          const cardElement = createCard(item);
          cardsSection.appendItem(cardElement);
        },
      },
      ".elements__list"
    );
    cardsSection.renderItems(cardsArr);
  })
  .catch((err) => {
    console.log(`Возникла ошибка при загрузке данных с сервера: ${err}`);
  });

//Обработчики

//Открытие попапа изменения аватара
profileAvatar.addEventListener("click", () => {
  avatarUpdatePopup.open();
  avatarFormValidator.disableSubmitButton();
});

//открытие попапа редактирования профиля
popupProfileOpenButton.addEventListener("click", () => {
  editPopupForm.open();
  const profileData = profileInfo.getUserInfo();
  formInputs.nameInput.value = profileData.name;
  formInputs.aboutInput.value = profileData.about;
  editFormValidator.resetFormState();
});

//открытие попапа добавления новой карточки
popupAddOpenButton.addEventListener("click", () => {
  addPopupForm.open();
  addFormValidator.resetFormState();
  addFormValidator.disableSubmitButton();
});
