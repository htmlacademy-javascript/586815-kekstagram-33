import {photos} from './photo-data/create-array-photos.js';

import { open, preview, renderContent } from './preview-rendering.js';

const windowWithThumbnails = document.querySelector('.pictures');

const templateOfThumbnail = document.querySelector('#picture').content.querySelector('.picture');

const fragmentForThumbnails = document.createDocumentFragment();

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

const renderPhotos = (arrayPhotos) => {
  arrayPhotos.forEach((photo) => {
    fragmentForThumbnails.appendChild(renderPhoto(photo));
  }
  );

  windowWithThumbnails.appendChild(fragmentForThumbnails);
};

renderPhotos(photos);
