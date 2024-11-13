import { isEscapeKey } from './util.js';

const INITIAL_VISIBLE_COMMENTS = 5;
const COMMENTS_BATCH_SIZE = 5;

const preview = document.querySelector('.big-picture');
const buttonCancelPreview = preview.querySelector('.big-picture__cancel');
const bigPictureContainer = preview.querySelector('.big-picture__img');
const bigPicture = bigPictureContainer.querySelector('img');
const likes = preview.querySelector('.likes-count');
const description = preview.querySelector('.social__caption');
const commentsList = preview.querySelector('.social__comments');
const templateComment = commentsList.querySelector('.social__comment');
const maxNumberComments = preview.querySelector('.social__comment-total-count');
const countNumberComments = preview.querySelector('.social__comment-shown-count');
const buttonShowMoreComments = preview.querySelector('.comments-loader');

let currentVisibleComments;
let arrayComments = [];

const renderComments = (comments, startIndex, endIndex) => {
  const fragment = document.createDocumentFragment();
  const newComments = comments.slice(startIndex, endIndex);
  arrayComments = comments;
  newComments.forEach((comment) => {
    const newComment = templateComment.cloneNode(true);
    newComment.querySelector('.social__text').textContent = comment.message;
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    fragment.appendChild(newComment);
  });
  commentsList.appendChild(fragment);
};

const updateVisibleCommentsCount = (count, comments) => {
  countNumberComments.textContent = Math.min(count, comments.length);
};

const toggleShowMoreButtonVisibility = (comments, count) => {
  if (count >= comments.length) {
    buttonShowMoreComments.classList.add('hidden');
  }
};

export const showMoreComments = () => {
  const newEndIndex = currentVisibleComments + COMMENTS_BATCH_SIZE;
  renderComments(arrayComments, currentVisibleComments, newEndIndex);
  currentVisibleComments = newEndIndex;
  toggleShowMoreButtonVisibility(arrayComments, currentVisibleComments, showMoreComments);
  updateVisibleCommentsCount(currentVisibleComments, arrayComments);
};

const renderContent = (photo) => {
  currentVisibleComments = INITIAL_VISIBLE_COMMENTS;
  bigPicture.src = photo.url;
  likes.textContent = photo.likes;
  description.textContent = photo.description;
  maxNumberComments.textContent = photo.comments.length;
  commentsList.innerHTML = '';
  renderComments(photo.comments, 0, currentVisibleComments);
  updateVisibleCommentsCount(currentVisibleComments, photo.comments);
  toggleShowMoreButtonVisibility(photo.comments, currentVisibleComments);
};

const close = () => {
  preview.classList.add('hidden');
  document.body.classList.remove('modal-open');
  buttonShowMoreComments.classList.remove('hidden');
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    close();
  }
};

const open = (photo, previewBox, actRendering) => {
  document.body.classList.add('modal-open');
  previewBox.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown, { once: true });
  actRendering(photo);
};

buttonCancelPreview.addEventListener('click', () => {
  close();
  document.removeEventListener('keydown', onDocumentKeydown);
});

buttonShowMoreComments.addEventListener('click',showMoreComments);

export { open, preview, renderContent };
