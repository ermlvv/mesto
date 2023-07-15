import Popup from './Popup.js'

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._form = this._popupSelector.querySelector('.popup__form');
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    })
    
    return this._inputValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._submitHandler(this._getInputValues())
    })
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}