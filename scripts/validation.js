const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn-inactive",
  inputErrorClass: "modal__input-error",
  errorClass: "modal__error_visible",
};

const showInputError = (form, input, errorMsg, validationConfig) => {
  const errorMsgElement = form.querySelector(`#${input.id}-error`);
  errorMsgElement.textContent = errorMsg;
  input.classList.add(validationConfig.inputErrorClass);
};

const hideInputError = (form, input, validationConfig) => {
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = "";
  input.classList.remove(validationConfig.inputErrorClass);
};

const checkInputValidity = (form, input, validationConfig) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, validationConfig);
  } else {
    hideInputError(form, input, validationConfig);
  }
};

const hasInvalidInput = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputs, submitButton, validationConfig) => {
  if (hasInvalidInput(inputs)) {
    disableButton(submitButton, validationConfig);
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove(validationConfig.inactiveButtonClass);
  }
};

const disableButton = (submitButton, validationConfig) => {
  submitButton.disabled = true;
  submitButton.classList.add(validationConfig.inactiveButtonClass);
};

const resetValidation = (form, inputs, validationConfig) => {
  inputs.forEach((input) => {
    hideInputError(form, input, validationConfig);
  });
};

const setEventListeners = (form, validationConfig) => {
  const inputs = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButton = form.querySelector(
    validationConfig.submitButtonSelector
  );

  toggleButtonState(inputs, submitButton, validationConfig);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, validationConfig);
      toggleButtonState(inputs, submitButton, validationConfig);
    });
  });
};

const enableValidation = (validationConfig) => {
  const forms = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  forms.forEach((form) => {
    setEventListeners(form, validationConfig);
  });
};

enableValidation(validationConfig);
