import { isEscapeKey } from './util.js';

const INITIAL_VISIBLE_COMMENTS = 5;
const COMMENTS_BATCH_SIZE = 5;

const previewContainerNode = document.querySelector('.big-picture');
const buttonCancelNode = previewContainerNode.querySelector('.big-picture__cancel');
const imageContainerNode = previewContainerNode.querySelector('.big-picture__img');
const imageNode = imageContainerNode.querySelector('img');
const countForLikesNode = previewContainerNode.querySelector('.likes-count');
const descriptionNode = previewContainerNode.querySelector('.social__caption');
const commentsListNode = previewContainerNode.querySelector('.social__comments');
const templateComment = commentsListNode.querySelector('.social__comment');
const totalCountCommentsNode = previewContainerNode.querySelector('.social__comment-total-count');
const currentCountComments = previewContainerNode.querySelector('.social__comment-shown-count');
const buttonShowMoreCommentsNode = previewContainerNode.querySelector('.comments-loader');

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
  commentsListNode.appendChild(fragment);
};

const updateVisibleCommentsCount = (count, comments) => {
  currentCountComments.textContent = Math.min(count, comments.length);
};

const toggleShowMoreButtonVisibility = (comments, count) => {
  if (count >= comments.length) {
    buttonShowMoreCommentsNode.classList.add('hidden');
  }
};

const showMoreComments = () => {
  const newEndIndex = currentVisibleComments + COMMENTS_BATCH_SIZE;
  renderComments(arrayComments, currentVisibleComments, newEndIndex);
  currentVisibleComments = newEndIndex;
  toggleShowMoreButtonVisibility(arrayComments, currentVisibleComments, showMoreComments);
  updateVisibleCommentsCount(currentVisibleComments, arrayComments);
};

const renderContent = (photo) => {
  currentVisibleComments = INITIAL_VISIBLE_COMMENTS;
  imageNode.src = photo.url;
  countForLikesNode.textContent = photo.likes;
  descriptionNode.textContent = photo.description;
  totalCountCommentsNode.textContent = photo.comments.length;
  commentsListNode.innerHTML = '';
  renderComments(photo.comments, 0, currentVisibleComments);
  updateVisibleCommentsCount(currentVisibleComments, photo.comments);
  toggleShowMoreButtonVisibility(photo.comments, currentVisibleComments);
};

const close = () => {
  previewContainerNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
  buttonShowMoreCommentsNode.classList.remove('hidden');
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

buttonCancelNode.addEventListener('click', () => {
  close();
  document.removeEventListener('keydown', onDocumentKeydown);
});

buttonShowMoreCommentsNode.addEventListener('click',showMoreComments);


export { open, previewContainerNode, renderContent };
