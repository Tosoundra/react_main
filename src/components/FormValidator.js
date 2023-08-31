export default class FormValidator {
  constructor(config, formElement) {
    this._form = formElement;
    this._config = config;
  }
  _getFormElements() {
    this._inputList = Array.from(this._form.querySelectorAll(this._config.formInput));
    this._submitButton = this._form.querySelector(this._config.formSubmit);
  }
  _submitDisable = () => {
    this._submitButton.setAttribute('disabled', true);
    this._submitButton.classList.remove(this._config.submitEnable);
  };

  _submitEnable = () => {
    this._submitButton.removeAttribute('disabled', true);
    this._submitButton.classList.add(this._config.submitEnable);
  };

  _submitToggle = () => {
    if (!this._form.checkValidity()) {
      this._submitDisable();
    } else {
      this._submitEnable();
    }
  };

  _inputInvalid = (error, input) => {
    const errorMessage = this._form.querySelector(`.${input.id}-error`);
    errorMessage.textContent = error;
  };

  _inputValid = input => {
    const errorMessage = this._form.querySelector(`.${input.id}-error`);
    errorMessage.textContent = '';
  };

  _setEventListeners = () => {
    this._getFormElements();
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkValid(inputElement);
        this._submitToggle();
      });
    });
  };
  _checkValid = input => {
    if (!input.validity.valid) {
      this._inputInvalid(input.validationMessage, input);
    } else {
      this._inputValid(input);
    }
  };

  resetValidation() {
    this._submitToggle()
  }

  enableValidation() {
    this._setEventListeners();
  }
}
