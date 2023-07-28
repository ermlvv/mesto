import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form_type_remove-card");
    this._submitButton = this._form.querySelector(".popup__button");
    this._submitHandler = submitHandler;
  }

  open(cardId, cardElement) {
    this._cardId = cardId;
    this._cardElement = cardElement;
    super.open();
  }

  renderPreloader(message) {
    this._submitButton.textContent = message;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._cardId, this._cardElement);
    });

    super.setEventListeners();
  }
}
