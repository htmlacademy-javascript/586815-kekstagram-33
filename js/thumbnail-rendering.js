import { open, previewContainerNode, renderContent } from './preview-rendering.js';
import { getRandomInteger } from './util.js';

const thumbnailsContainerNode = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragmentForThumbnailsNode = document.createDocumentFragment();

const clearThumbnails = () => {
  const photoContainersNode = document.querySelectorAll('.picture');
  photoContainersNode.forEach((element) => {
    element.remove();
  });
};

const renderPhoto = (photo) => {
  const newThumbnail = thumbnailTemplate.cloneNode(true);
  newThumbnail.querySelector('.picture__img').src = photo.url;
  newThumbnail.querySelector('.picture__img').alt = photo.description;
  newThumbnail.querySelector('.picture__likes').textContent = photo.likes;
  newThumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  newThumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    open(photo, previewContainerNode, renderContent);
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
    fragmentForThumbnailsNode.appendChild(renderPhoto(photo));
  }
  );

  thumbnailsContainerNode.appendChild(fragmentForThumbnailsNode);
};

export { renderPhotos, getRandomPhotos, getDiscussedPhotos };
