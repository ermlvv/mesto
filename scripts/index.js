import { initialCards } from './constans.js';

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');
const editPopupOpenBtn = document.querySelector('.profile__edit-button');
const addPopupOpenBtn = document.querySelector('.profile__add-button');
const popupCloseBtn = document.querySelectorAll('.popup__close-button');
const openPopup = (popupToOpen) => popupToOpen.classList.add('popup_opened');
const closePopup = (popupToClose) => popupToClose.classList.remove('popup_opened');
const formElementEdit = document.querySelector('.popup__form_type_edit');
const formElementAdd = document.querySelector('.popup__form_type_add');
const profileUserName = document.querySelector('.profile__info-name');
const profileUserAbout = document.querySelector('.profile__info-about');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');
const popupsCloseBtn = Array.from(popupCloseBtn);
const popupsArr = Array.from(popups);
const placeInput = document.querySelector('.popup__input_type_place');
const imageUrlInput = document.querySelector('.popup__input_type_image');
const cardsSection = document.querySelector('.elements__list');
const cardTemplete = document.querySelector('.element_template').content;
const popupImage = document.querySelector('.popup__image')
const popupImageTitle = document.querySelector('.popup__image-title')

editPopupOpenBtn.addEventListener('click', () => {
  openPopup(popupEditProfile),
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileUserAbout.textContent;
});

addPopupOpenBtn.addEventListener('click', () => openPopup(popupAddCard));
popupsCloseBtn.forEach((item) => item.addEventListener('click', () => popupsArr.forEach((item) => closePopup(item))));

popupsArr.forEach((item) => {
  item.addEventListener('click', (evt) => {
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


const createCard = (name, link) => {
  const cardContainer = cardTemplete.cloneNode(true);
  const cardImage = cardContainer.querySelector('.element__image');
  
  cardImage.src = link;
  cardImage.alt = name;
  cardContainer.querySelector('.element__heading').textContent = name;
  cardContainer.querySelector('.element__remove').addEventListener('click',removeCard);
  cardContainer.querySelector('.element__like').addEventListener('click', likeCard);
  cardContainer.querySelector('.element__image').addEventListener('click',renderImagePopup)

  return cardContainer;
};

const renderImagePopup = (evt) => {
  popupImage.src = evt.target.closest('.element__image').src;
  popupImage.alt = evt.target.closest('.element').textContent;
  popupImageTitle.textContent = evt.target.closest('.element').textContent; 
  openPopup(imagePopup);
};

const addCard = (item) => {
  cardsSection.prepend(item);
};

const removeCard = (evt) => {
  const item = evt.target.closest('.element');
  item.remove();
};

const likeCard = (evt) => {
  const item = evt.target.closest('.element__like');
  item.classList.toggle('element__like_active')
};

initialCards.map((item) => createCard(item.name, item.link)).forEach(addCard);

const handleFormSubmitAdd = (evt) => {
  evt.preventDefault();
  const cardContainer = createCard(placeInput.value, imageUrlInput.value);
  addCard(cardContainer);
  closePopup(popupAddCard);
  evt.target.reset();
};

formElementAdd.addEventListener('submit', handleFormSubmitAdd);