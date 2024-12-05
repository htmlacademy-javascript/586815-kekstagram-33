import { isEscapeKey } from '../util.js';
import { resetScaleValue } from './scale.js';
import { resetEffectsSlider } from './filtres.js';
import { pristine } from './validation.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const formForUploadNode = document.querySelector('.img-upload__form');
const setupContainerNode = formForUploadNode.querySelector('.img-upload__overlay');
const buttonCancelNode = setupContainerNode.querySelector('.img-upload__cancel');
const previewImageNode = setupContainerNode.querySelector('img');
const fileChooserNode = formForUploadNode.querySelector('.img-upload__input[type=file]');
const effectsUploadImageNodes = setupContainerNode.querySelectorAll('.effects__preview');

const renderEffectsList = () => {
  const imageSrc = previewImageNode.src;
  effectsUploadImageNodes.forEach((element) => {
    if (!element.style.backgroundImage) {
      element.style.backgroundImage = `url(${imageSrc})`;
    }
  });
};

const resetEffectsList = () => {
  effectsUploadImageNodes.forEach((element) => {
    element.style.backgroundImage = null;
  });
};

const initUploadImage = () => {
  const file = fileChooserNode.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewImageNode.src = URL.createObjectURL(file);
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !document.querySelector('.error')) {
    evt.preventDefault();
    close();
  }
};

function close() {
  document.body.classList.remove('modal-open');
  setupContainerNode.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  formForUploadNode.reset();
  resetEffectsSlider();
  pristine.reset();
  URL.revokeObjectURL(previewImageNode.src);
  resetScaleValue();
  resetEffectsList();
}

const open = () => {
  document.body.classList.add('modal-open');
  setupContainerNode.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  initUploadImage();
  renderEffectsList();
};

formForUploadNode.addEventListener('change',() => open());

buttonCancelNode.addEventListener('click', () => close());

export { formForUploadNode, close };
