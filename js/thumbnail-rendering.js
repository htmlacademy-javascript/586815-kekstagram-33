import { open, preview, renderContent } from './preview-rendering.js';
import { getRandomInteger } from './util.js';

const windowWithThumbnails = document.querySelector('.pictures');
const templateOfThumbnail = document.querySelector('#picture').content.querySelector('.picture');
const fragmentForThumbnails = document.createDocumentFragment();

const clearThumbnails = () => {
  const photos = document.querySelectorAll('.picture');
  photos.forEach((element) => {
    element.remove();
  });
};

const renderPhoto = (photo) => {
  const newThumbnail = templateOfThumbnail.cloneNode(true);
  newThumbnail.querySelector('.picture__img').src = photo.url;
  newThumbnail.querySelector('.picture__img').alt = photo.description;
  newThumbnail.querySelector('.picture__likes').textContent = photo.likes;
  newThumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  newThumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    open(photo, preview, renderContent);
  });
  return newThumbnail;
};

const getRandomPhotos = (photos, count) => {
  const randomPhotos = [];
  const usedIndexes = new Set();

  while (randomPhotos.length < count && randomPhotos.length < photos.length) {
    const randomIndex = getRandomInteger(0, photos.length - 1);
    if (!usedIndexes.has(randomIndex)) {
      usedIndexes.add(randomIndex);
      randomPhotos.push(photos[randomIndex]);
    }
  }

  return randomPhotos;
};

const getDiscussedPhotos = (photos) => [...photos].sort((a, b) => b.comments.length - a.comments.length);

const renderPhotos = (photos) => {
  clearThumbnails();
  photos.forEach((photo) => {
    fragmentForThumbnails.appendChild(renderPhoto(photo));
  }
  );

  windowWithThumbnails.appendChild(fragmentForThumbnails);
};

export { renderPhotos, getRandomPhotos, getDiscussedPhotos };
