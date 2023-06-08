const validationConfig = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}


const showError = (validationConfig, inputElement) => {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);

  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(validationConfig.inputErrorClass);
}

const hideError = (validationConfig, inputElement) => {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  
  errorElement.textContent = '';
  errorElement.classList.remove(validationConfig.errorClass);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  
}

const validateInput = (validationConfig, inputElement) => {
  if(!inputElement.validity.valid) {
    showError(validationConfig, inputElement);
  } else {
    hideError(validationConfig, inputElement);
  };
};

const formSubmitButtonChangeState = (validationConfig, formElement) => {
  const button = formElement.querySelector(validationConfig.submitButtonSelector);

  if (!formElement.checkValidity()) {
    button.setAttribute('disabled', true);
    button.classList.add('popup__button_disabled');
  } else {
    button.removeAttribute('disabled');
    button.classList.remove('popup__button_disabled');
  };
};

const formCheckState = (validationConfig, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputElement));
  inputList.forEach((inputElement) => {
    validateInput(validationConfig, inputElement);
  });
};

  const formSubmitButtonCheckState = (validationConfig, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputElement));
    inputList.forEach((inputElement) => {
      hideError(validationConfig, inputElement)
    });
    formSubmitButtonChangeState(validationConfig, formElement);
};

const setEventListeners = (validationConfig, formElement) => {
  const inputList = Array.from(document.querySelectorAll(validationConfig.inputElement));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      validateInput(validationConfig, inputElement);
      formSubmitButtonChangeState(validationConfig, formElement);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formElement));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(validationConfig, formElement);
  });
};