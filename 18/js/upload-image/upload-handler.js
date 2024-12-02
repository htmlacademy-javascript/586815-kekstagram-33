import { formForUploadNode, close } from './modal-rendering.js';
import { pristine } from './validation.js';
import { sendData } from '../api.js';
import { isEscapeKey } from '../util.js';

const submitButtonNode = formForUploadNode.querySelector('.img-upload__submit');
const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикация...'
};

const blockSubmitButton = () => {
  submitButtonNode.disabled = true;
  submitButtonNode.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonNode.disabled = false;
  submitButtonNode.textContent = SubmitButtonText.IDLE;
};

const setupCloseHandlers = (container, closeButton, inner, options = () => {}) => {
  const removeContainer = () => {
    container.remove();
    document.removeEventListener('keydown', onEscapePress);
    document.removeEventListener('click', onOutsideClick);
    if (typeof options === 'function') {
      options();
    }
  };

  function onEscapePress (evt) {
    if (isEscapeKey(evt)) {
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

const showSuccess = () => {
  const fragment = document.createDocumentFragment();
  const successContainer = templateSuccess.cloneNode(true);
  const innerContainer = successContainer.querySelector('.success__inner');
  const successButton = successContainer.querySelector('.success__button');
  fragment.appendChild(successContainer);
  document.body.appendChild(fragment);

  setupCloseHandlers(successContainer, successButton, innerContainer , close());
};

const showError = () => {
  const fragment = document.createDocumentFragment();
  const errorContainer = templateError.cloneNode(true);
  const innerContainer = errorContainer.querySelector('.error__inner');
  const errorButton = errorContainer.querySelector('.error__button');
  fragment.appendChild(errorContainer);
  document.body.appendChild(fragment);

  setupCloseHandlers(errorContainer, errorButton, innerContainer);
};

const setUserFormSubmit = () => {
  formForUploadNode.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(
          (response) => {
            if (!response.ok) {
              showError();
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
