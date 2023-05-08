const popup = document.querySelector('.popup');
const popupOpenBtn = document.querySelector('.profile__edit-button');
const popupCloseBtn = document.querySelector('.popup__close-button');
const popupSaveButton = document.querySelector('.popup__button');
const popupToggle = (popupToToggle) => popupToToggle.classList.toggle('popup_opened');
const formElement = document.querySelector('.popup__form');
const profileUserName = document.querySelector('.profile__info-name');
const profileUserAbout = document.querySelector('.profile__info-about');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');


popupOpenBtn.addEventListener('click', () => {
  popupToggle(popup),
  nameInput.value = profileUserName.textContent,
  jobInput.value = profileUserAbout.textContent
});
popupCloseBtn.addEventListener('click', () => popupToggle(popup));
popupSaveButton.addEventListener('click', () => popupToggle(popup));

popup.addEventListener('click', (evt) => {
  if (evt.target == evt.currentTarget) {
    popupToggle(popup)
  }
});

function handleFormSubmit (evt) {
    evt.preventDefault();
      profileUserName.textContent = nameInput.value;
      profileUserAbout.textContent = jobInput.value;
  }

formElement.addEventListener('submit', handleFormSubmit);