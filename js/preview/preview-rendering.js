import { isEscapeKey } from '../util.js';
import { photos } from '../photo-data/create-array-photos.js';

const MAXSTARTVISIBLECOMMENTS = 5;
const COUNTERFORSHOWMORECOMMENTS = 5;

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

const updateCountNumberComments = (count, comments) => {
  countNumberComments.textContent = Math.min(count, comments.length);
};

const checkCommentLimitAndUpdateUI = (comments, count, act) => {
  if (count >= comments.length) {
    buttonShowMoreComments.classList.add('hidden');
    buttonShowMoreComments.removeEventListener('click', act);
  }
};

const renderContent = (array, item) => {
  const foundItem = array.find((photo) => photo.id === item.id);
  if (foundItem) {
    let visibleCommentsCount = MAXSTARTVISIBLECOMMENTS;
    bigPicture.src = foundItem.url;
    likes.textContent = foundItem.likes;
    description.textContent = foundItem.description;
    maxNumberComments.textContent = foundItem.comments.length;
    commentsList.innerHTML = '';
    renderComments(foundItem.comments, 0, visibleCommentsCount);
    updateCountNumberComments(visibleCommentsCount, foundItem.comments);

    const showMoreComments = () => {
      const newEndIndex = visibleCommentsCount + COUNTERFORSHOWMORECOMMENTS;
      renderComments(foundItem.comments, visibleCommentsCount, newEndIndex);
      visibleCommentsCount = newEndIndex;
      checkCommentLimitAndUpdateUI(foundItem.comments, visibleCommentsCount, showMoreComments);
      updateCountNumberComments(visibleCommentsCount, foundItem.comments);
    };

    buttonShowMoreComments.addEventListener('click', showMoreComments);
    checkCommentLimitAndUpdateUI(foundItem.comments, visibleCommentsCount, showMoreComments);
  }
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
    buttonCancelPreview.addEventListener('click', () => {
      close();
      document.removeEventListener('keydown', onDocumentKeydown);
    });

    const clickedElement = evt.target.closest('.picture');
    const clickedPicture = clickedElement.querySelector('.picture__img');

    renderContent(photos, clickedPicture);
  }
};

sectionWithThumbnails.addEventListener('click', open);
