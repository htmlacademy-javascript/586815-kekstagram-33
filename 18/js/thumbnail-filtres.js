import { getRandomPhotos, getDiscussedPhotos } from './thumbnail-rendering.js';

const MAX_AMOUNT_RANDOM_PHOTOS = 10;

const filtresContainerNode = document.querySelector('.img-filters');
const filtresFormNode = filtresContainerNode.querySelector('.img-filters__form');

let currentStatusFiltres = 'filter-default';

const showFiltres = () => {
  filtresContainerNode.classList.remove('img-filters--inactive');
};

function getCurrentPhotos(photos) {
  let photosForRendering = [];

  if (currentStatusFiltres === 'filter-default') {
    photosForRendering = photos;
  }
  if (currentStatusFiltres === 'filter-random') {
    photosForRendering = getRandomPhotos(photos, MAX_AMOUNT_RANDOM_PHOTOS);
  }
  if (currentStatusFiltres === 'filter-discussed') {
    photosForRendering = getDiscussedPhotos(photos);
  }
  return photosForRendering;
}

const initFiltresForm = (cb) => {
  filtresFormNode.addEventListener('click', (evt) => {
    const button = evt.target.closest('.img-filters__button');
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    button.classList.add('img-filters__button--active');
    currentStatusFiltres = document.querySelector('.img-filters__button--active').id;
    cb();
  });
};

export { showFiltres, getCurrentPhotos, initFiltresForm };
