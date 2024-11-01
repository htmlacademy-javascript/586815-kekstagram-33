import {photos} from './photo-data/create-array-photos.js';

const windowWithThumbnails = document.querySelector('.pictures');

const templateOfThumbnail = document.querySelector('#picture').content.querySelector('.picture');

const fragmentForThumbnails = document.createDocumentFragment();

const renderPhoto = ({id, url, description, likes, comments}) => {
  const newThumbnail = templateOfThumbnail.cloneNode(true);

  newThumbnail.querySelector('.picture__img').id = id;
  newThumbnail.querySelector('.picture__img').src = url;
  newThumbnail.querySelector('.picture__img').alt = description;
  newThumbnail.querySelector('.picture__likes').textContent = likes;
  newThumbnail.querySelector('.picture__comments').textContent = comments.length;

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
