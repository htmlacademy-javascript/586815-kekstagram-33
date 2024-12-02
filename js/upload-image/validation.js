import './../../vendor/pristine/pristine.min.js';
import { formForUploadNode } from './modal-rendering.js';

const MAX_DESCRIPTION_LENGTH = 140;
const MAX_AMOUNT_HASHTAGS = 5;

const descriptionFieldNode = formForUploadNode.querySelector('.text__description');
const hashtagsFieldNode = formForUploadNode.querySelector('.text__hashtags');

function validateDescriptionLength (value) {
  return value.length <= MAX_DESCRIPTION_LENGTH;
}

function validateCombinedHashtags(value) {
  const hashtags = value.trim().split(/\s+/);
  const lowercaseHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());

  const isValid = hashtags.every((hashtag) => {
    if (hashtag === '') {
      return true;
    }
    return /^#[a-zA-Zа-яА-Я0-9]{1,19}$/.test(hashtag);
  });

  if (!isValid) {
    return 'Введён невалидный хэштег';
  }

  const hasDuplicates = new Set(lowercaseHashtags).size !== hashtags.length;
  if (hasDuplicates) {
    return 'Хэштеги повторяются';
  }

  const hasAmountHashtags = hashtags.length > MAX_AMOUNT_HASHTAGS;
  if (hasAmountHashtags) {
    return 'Превышено количество хэштегов';
  }

  return true;
}

const pristine = new Pristine(formForUploadNode, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

pristine.addValidator(
  descriptionFieldNode,
  validateDescriptionLength,
  `Длина комментария больше ${ MAX_DESCRIPTION_LENGTH } символов`
);

pristine.addValidator(
  hashtagsFieldNode,
  (value) => validateCombinedHashtags(value) === true,
  (value) => validateCombinedHashtags(value)
);

const onTextFieldFocus = (evt) => {
  evt.stopPropagation();
};

descriptionFieldNode.addEventListener('keydown', onTextFieldFocus);
hashtagsFieldNode.addEventListener('keydown', onTextFieldFocus);

export { pristine };
