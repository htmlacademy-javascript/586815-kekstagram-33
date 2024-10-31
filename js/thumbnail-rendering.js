import {photos} from './photo-data/create-array-photos.js';

const windowWithThumbnails = document.querySelector('.pictures');

const templateOfThumbnail = document.querySelector('#picture').content.querySelector('.picture');

const fragmentForThumbnails = document.createDocumentFragment();

photos.forEach(({url, description, likes, comments}) => {
  const newThumbnail = templateOfThumbnail.cloneNode(true);

  newThumbnail.querySelector('.picture__img').src = url;
  newThumbnail.querySelector('.picture__img').alt = description;
  newThumbnail.querySelector('.picture__likes').textContent = likes;
  newThumbnail.querySelector('.picture__comments').textContent = comments.length;

  fragmentForThumbnails.appendChild(newThumbnail);
}
);

windowWithThumbnails.appendChild(fragmentForThumbnails);
