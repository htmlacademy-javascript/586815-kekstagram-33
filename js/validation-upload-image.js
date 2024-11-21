import { isEscapeKey } from './util.js';
import './../vendor/pristine/pristine.min.js';
import './setup-upload-image.js';
import { resetEffectsSlider } from './setup-upload-image.js';

const MAX_DESCRIPTION_LENGTH = 140;
const MAX_AMOUNT_HASHTAGS = 5;

const form = document.querySelector('.img-upload__form');
const previewNewPhoto = document.querySelector('.img-upload__overlay');
const buttonCancelPreviewUpload = document.querySelector('.img-upload__cancel');
const descriptionField = form.querySelector('.text__description');
const hashtagsField = form.querySelector('.text__hashtags');

function validateDescriptionLength (value) {
  return value.length <= MAX_DESCRIPTION_LENGTH;
}

function validateCombinedHashtags(value) {
  const hashtags = value.trim().split(/\s+/);
  const lowercaseHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());

  // Проверка на валидность каждого хэштега
  const isValid = hashtags.every((hashtag) => /^#[a-zA-Zа-яА-Я0-9]{1,19}$/.test(hashtag));
  if (!isValid) {
    return 'Введён невалидный хэштег';
  }

  // Проверка на дубликаты
  const hasDuplicates = new Set(lowercaseHashtags).size !== hashtags.length;
  if (hasDuplicates) {
    return 'Хэштеги повторяются';
  }

  //Проверка на количество хэштегов
  const hasAmountHashtags = hashtags.length > MAX_AMOUNT_HASHTAGS;
  if (hasAmountHashtags) {
    return 'Превышено количество хэштегов';
  }


  // Всё прошло успешно
  return true;
}

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

pristine.addValidator(
  descriptionField,
  validateDescriptionLength,
  `Длина комментария больше ${ MAX_DESCRIPTION_LENGTH } символов`
);

pristine.addValidator(
  hashtagsField,
  (value) => validateCombinedHashtags(value) === true,
  (value) => validateCombinedHashtags(value)
);

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    close();
  }
};

function close () {
  document.body.classList.remove('modal-open');
  previewNewPhoto.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  form.reset();
  resetEffectsSlider();
}

const open = () => {
  document.body.classList.add('modal-open');
  previewNewPhoto.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

form.addEventListener('change', open);

form.addEventListener('submit', (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();
  }
});

buttonCancelPreviewUpload.addEventListener('click', close);

const onTextFieldFocus = (evt) => {
  evt.stopPropagation();
};

descriptionField.addEventListener('keydown', onTextFieldFocus);
hashtagsField.addEventListener('keydown', onTextFieldFocus);
