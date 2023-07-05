export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._formElement = formElement;
    this._inputElement = formElement.querySelector(validationConfig.inputSelector);
    this._inputSelector = validationConfig.inputSelector
    this.submitButtonSelector = formElement.querySelector(validationConfig.submitButtonSelector);
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
  }
  
  _showError(inputElement) { 
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  _validateInput(inputElement) {
    if(!this._inputElement.validity.valid) {
      this._showError(inputElement)
      console.log(inputElement)
    } else {
      this._hideError(inputElement)
    }
  }
  
  disableSubmitButton() {
    this.submitButtonSelector .setAttribute('disabled', true);
    this.submitButtonSelector .classList.add(this._inactiveButtonClass);
  }

  _enableSubmitButton() {
    this.submitButtonSelector .removeAttribute('disabled');
    this.submitButtonSelector .classList.remove(this._inactiveButtonClass);
  }


  _formSubmitButtonChangeState() {
    if (!this._inputElement.validity.valid) {
      this.disableSubmitButton();
        } else {
          this._enableSubmitButton();
        };
  }
  
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._validateInput(inputElement);
        this._formSubmitButtonChangeState();
      })
    })
  };

  resetFormState() {
    this._enableSubmitButton();
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    })
    _formSubmitButtonChangeState();
  }
  
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    })
    this._setEventListeners();
  }
};