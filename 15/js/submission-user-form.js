// import { showError, showSuccess } from './util.js';
import { form, pristine, close, removeEscapeListenerUploadImage, onDocumentKeydown } from './validation-upload-image.js';
import { sendData } from './api.js';
import { isEscapeKey } from './util.js';

const submitButton = form.querySelector('.img-upload__submit');
const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикация...'
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// Удаляет переданный контейнер и снимает обработчики событий
const setupCloseHandlers = (container, closeButton, inner, options = null) => {
  const removeContainer = () => {
    container.remove();
    document.removeEventListener('click', onOutsideClick);
    options();
  };

  function onEscapePress (evt) {
    if (isEscapeKey) {
      evt.preventDefault();
      removeContainer();
    }
  }

  function onOutsideClick (evt) {
    if (!inner.contains(evt.target)) {
      removeContainer();
    }
  }

  closeButton.addEventListener('click', removeContainer);
  document.addEventListener('keydown', onEscapePress);
  document.addEventListener('click', onOutsideClick);
};

//настройка сообщения об успешной загрузке
const showSuccess = () => {
  const fragment = document.createDocumentFragment();
  const successContainer = templateSuccess.cloneNode(true);
  const innerContainer = successContainer.querySelector('.success__inner');
  const successButton = successContainer.querySelector('.success__button');
  fragment.appendChild(successContainer);
  document.body.appendChild(fragment);

  setupCloseHandlers(successContainer, successButton, innerContainer , close);
};

//настройка сообщения о неуспешной загрузке
const showError = () => {
  const fragment = document.createDocumentFragment();
  const errorContainer = templateError.cloneNode(true);
  const innerContainer = errorContainer.querySelector('.error__inner');
  const errorButton = errorContainer.querySelector('.error__button');
  fragment.appendChild(errorContainer);
  document.body.appendChild(fragment);

  setupCloseHandlers(errorContainer, errorButton, innerContainer, removeEscapeListenerUploadImage());
};

const setUserFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(
          (response) => {
            if (!response.ok) {
              throw new Error(showError());
            }
            showSuccess();
          }
        )
        .catch(
          () => {
            showError();
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

export { setUserFormSubmit };
