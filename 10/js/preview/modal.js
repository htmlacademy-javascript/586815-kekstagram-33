import { isEscapeKey } from '../util.js';

const preview = document.querySelector('.big-picture');
const buttonCancelPreview = preview.querySelector('.big-picture__cancel');

// Функция закрытия модального окна
const closeModal = () => {
  preview.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

// Обработчик для закрытия по нажатию на Escape
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

// Функция открытия модального окна
export const openModal = () => {
  preview.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

// Инициализация закрытия окна по кнопке
export const initCloseModalButton = () => {
  buttonCancelPreview.addEventListener('click', () => {
    closeModal();
    document.removeEventListener('keydown', onDocumentKeydown);
  });
};
