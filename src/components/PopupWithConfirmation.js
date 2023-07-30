import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form_type_remove-card");
    this._submitButton = this._form.querySelector(".popup__button");
    this._submitHandler = submitHandler;
  }

  open(card) {
    this._card = card;
    super.open();
  }

  renderPreloader(message) {
    this._submitButton.textContent = message;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._card);
    });

    super.setEventListeners();
  }
}
