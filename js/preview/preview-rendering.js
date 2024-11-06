import { isEscapeKey } from '../util.js';
import { photos } from '../photo-data/create-array-photos.js';

const INITIAL_VISIBLE_COMMENTS = 5;
const COMMENTS_BATCH_SIZE = 5;

const sectionWithThumbnails = document.querySelector('.pictures');
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
let selectedPhoto;

const renderComments = (comments, startIndex, endIndex) => {
  const fragment = document.createDocumentFragment();
  const newComments = comments.slice(startIndex, endIndex);
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

const renderContent = (array, item) => {
  selectedPhoto = array.find((photo) => photo.id === item.id);
  if (selectedPhoto) {
    currentVisibleComments = INITIAL_VISIBLE_COMMENTS;
    bigPicture.src = selectedPhoto.url;
    likes.textContent = selectedPhoto.likes;
    description.textContent = selectedPhoto.description;
    maxNumberComments.textContent = selectedPhoto.comments.length;
    commentsList.innerHTML = '';
    renderComments(selectedPhoto.comments, 0, currentVisibleComments);
    updateVisibleCommentsCount(currentVisibleComments, selectedPhoto.comments);
    toggleShowMoreButtonVisibility(selectedPhoto.comments, currentVisibleComments);
  }
};

const showMoreComments = () => {
  const newEndIndex = currentVisibleComments + COMMENTS_BATCH_SIZE;
  renderComments(selectedPhoto.comments, currentVisibleComments, newEndIndex);
  currentVisibleComments = newEndIndex;
  toggleShowMoreButtonVisibility(selectedPhoto.comments, currentVisibleComments, showMoreComments);
  updateVisibleCommentsCount(currentVisibleComments, selectedPhoto.comments);
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

const open = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();

    document.body.classList.add('modal-open');
    preview.classList.remove('hidden');

    document.addEventListener('keydown', onDocumentKeydown, { once: true });

    const clickedElement = evt.target.closest('.picture');
    const clickedPicture = clickedElement.querySelector('.picture__img');

    renderContent(photos, clickedPicture);
  }
};

buttonCancelPreview.addEventListener('click', () => {
  close();
  document.removeEventListener('keydown', onDocumentKeydown);
});

buttonShowMoreComments.addEventListener('click', showMoreComments);

sectionWithThumbnails.addEventListener('click', open);


