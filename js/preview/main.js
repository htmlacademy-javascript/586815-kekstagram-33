import { photos } from '../photo-data/create-array-photos.js';
import { displayPhotoDetails } from './content.js';
import { initCommentsLoadMore , initCommentsLoad } from './comments.js';
import { openModal, initCloseModalButton } from './modal.js';

const sectionWithThumbnails = document.querySelector('.pictures');

let selectedPhotoComments;

// Функция для обработки клика по миниатюре и открытия модального окна
const handleThumbnailClick = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();

    const clickedElement = evt.target.closest('.picture');
    const clickedPicture = clickedElement.querySelector('.picture__img');
    const selectedPhoto = photos.find((photo) => photo.id === clickedPicture.id);

    if (selectedPhoto) {
      selectedPhotoComments = selectedPhoto.comments;
      displayPhotoDetails(selectedPhoto);
      initCommentsLoad(selectedPhotoComments);
      openModal();
    }
  }
};

// Инициализация обработчиков событий
sectionWithThumbnails.addEventListener('click', handleThumbnailClick);
initCloseModalButton();
initCommentsLoadMore(selectedPhotoComments);
