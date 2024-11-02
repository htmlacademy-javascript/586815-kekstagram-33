import { isEscapeKey } from '../util.js';
import { photos } from '../photo-data/create-array-photos.js';

const MAXCOMMENTS = 5;

const sectionWithThumbnails = document.querySelector('.pictures');
const preview = document.querySelector('.big-picture');
const buttonCancelPreview = document.querySelector('.big-picture__cancel');
const bigPictureContainer = document.querySelector('.big-picture__img');
const bigPicture = bigPictureContainer.querySelector('img');
const likes = preview.querySelector('.likes-count');
const description = preview.querySelector('.social__caption');
const commentsList = preview.querySelector('.social__comments');
const templateComment = commentsList.querySelector('.social__comment');
const maxNumberComments = preview.querySelector('.social__comment-total-count');
const countNumberComments = preview.querySelector('.social__comment-shown-count');

const close = () => {
  preview.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    close();
  }
};

const renderComments = (arrayComments) => {
  const fragment = document.createDocumentFragment();

  arrayComments.forEach((comment, index) => {
    const newComment = templateComment.cloneNode(true);

    newComment.querySelector('.social__text').textContent = comment.message;
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    fragment.appendChild(newComment);
    if (index > MAXCOMMENTS - 1) {
      newComment.classList.add('hidden');
    }
  });
  commentsList.innerHTML = '';
  commentsList.appendChild(fragment);
};

const renderContent = (array, item) => {
  const foundItem = array.find((photo) => photo.id === item.id);
  if (foundItem) {
    bigPicture.src = foundItem.url;
    likes.textContent = foundItem.likes;
    description.textContent = foundItem.description;
    maxNumberComments.textContent = foundItem.comments.length;
    if (foundItem.comments.length < MAXCOMMENTS) {
      countNumberComments.textContent = foundItem.comments.length;
    } else {
      countNumberComments.textContent = MAXCOMMENTS;
    }
    renderComments(foundItem.comments);
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

    //Временное скрытие счётчика комментариев и загрузки новых комментариев
    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
  }
};

sectionWithThumbnails.addEventListener('click', open);
