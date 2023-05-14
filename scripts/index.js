const popup = document.querySelectorAll('.popup');
// const avatarPopup = document.querySelector('.')
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const editPopupOpenBtn = document.querySelector('.profile__edit-button');
const addPopupOpenBtn = document.querySelector('.profile__add-button');
const popupCloseBtn = document.querySelectorAll('.popup__close-button');
const popupOpen = (popupToOpen) => popupToOpen.classList.add('popup_opened');
const popupClose = (popupToClose) => popupToClose.classList.remove('popup_opened');
// const popupToggle = (popupToToggle) => popupToToggle.classList.toggle('popup_opened');
const formElementEdit = document.querySelector('.popup__form_type_edit');
const formElementAdd = document.querySelector('.popup__form_type_add');
const profileUserName = document.querySelector('.profile__info-name');
const profileUserAbout = document.querySelector('.profile__info-about');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');
const popupsCloseBtn = Array.from(popupCloseBtn);
const popups = Array.from(popup);
const placeInput = document.querySelector('.popup__input_type_place');
const imageUrlInput = document.querySelector('.popup__input_type_image');

editPopupOpenBtn.addEventListener('click', () => {
  popupOpen(editPopup),
  nameInput.value = profileUserName.textContent,
  jobInput.value = profileUserAbout.textContent
});

addPopupOpenBtn.addEventListener('click', () => popupOpen(addPopup));
popupsCloseBtn.forEach((item) => item.addEventListener('click', () => popups.forEach((item) => popupClose(item))));

popups.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target == evt.currentTarget) {
      popupClose(item)
    }
  });
})

const handleFormSubmitEdit = (evt) => {
    evt.preventDefault();
      profileUserName.textContent = nameInput.value;
      profileUserAbout.textContent = jobInput.value;
      popupClose(editPopup);
  }

formElementEdit.addEventListener('submit', handleFormSubmitEdit);

const initialCards = [
  {
    name: 'Швеция',
    link: 'https://images.unsplash.com/photo-1667060307737-e237f30949c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  },
  {
    name: 'Новая Зеландия',
    link: 'https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1378&q=80'
  },
  {
    name: 'Австралия',
    link: 'https://images.unsplash.com/photo-1512036849132-48508f294900?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
  },
  {
    name: 'Исландия',
    link: 'https://images.unsplash.com/photo-1500043357865-c6b8827edf10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
  },
  {
    name: 'Норвегия',
    link: 'https://images.unsplash.com/photo-1521336575822-6da63fb45455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
  },
  {
    name: 'Финляндия',
    link: 'https://images.unsplash.com/photo-1611570266699-4b201348481b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  }
];

const cardsSection = document.querySelector('.elements__list');
const cardTemplete = document.querySelector('.element_template').content;
const createCard = (name, link) => {
    const cardContainer = cardTemplete.cloneNode(true);

    cardContainer.querySelector('.element__image').src = link;
    cardContainer.querySelector('.element__image').alt = name;
    cardContainer.querySelector('.element__heading').textContent = name;
    cardContainer.querySelector('.element__remove').addEventListener('click', removeCard);
    cardContainer.querySelector('.element__like').addEventListener('click', likeCard)
    return cardContainer;
}

const addCard = (item) => {
  cardsSection.prepend(item);
}

const removeCard = (evt) => {
  const item = evt.target.closest('.element');
  item.remove();
}

const likeCard = (evt) => {
  console.log('click')
  const item = evt.target.closest('.element__like');
  item.classList.toggle('element__like_active')
}

initialCards.map((item) => createCard(item.name, item.link)).forEach(addCard)

const handleFormSubmitAdd = (evt) => {
  evt.preventDefault();
  const cardContainer = createCard(placeInput.value, imageUrlInput.value);
  addCard(cardContainer);
  popupClose(addPopup);
  placeInput.value = '';
  imageUrlInput.value = '';
}

formElementAdd.addEventListener('submit', handleFormSubmitAdd);







