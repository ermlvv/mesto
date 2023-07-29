export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._formElement = formElement;
    this._inputSelector = validationConfig.inputSelector
    this.submitButtonSelector = formElement.querySelector(validationConfig.submitButtonSelector);
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
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
    if(!inputElement.validity.valid) {
      this._showError(inputElement)
    } else {
      this._hideError(inputElement)
    }
  }

  _checkForInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  disableSubmitButton() {
    this.submitButtonSelector.disabled = true;
    this.submitButtonSelector.classList.add(this._inactiveButtonClass);
  }

  _enableSubmitButton() {
    this.submitButtonSelector.disabled = false;
    this.submitButtonSelector.classList.remove(this._inactiveButtonClass);
  }
  
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._validateInput(inputElement);
        if(this._checkForInvalidInput()) {
          this.disableSubmitButton();
        } else {
          this._enableSubmitButton();
        }
      })
    })
  };

  resetFormState() {
    this._enableSubmitButton();

    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    })
  }
  
  enableValidation() {
    this._setEventListeners();
  }
};