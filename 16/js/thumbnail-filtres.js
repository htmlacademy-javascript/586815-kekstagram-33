import { getRandomPhotos, getDiscussedPhotos } from './thumbnail-rendering';

const MAX_AMOUNT_RANDOM_PHOTOS = 10;

const filtresForm = document.querySelector('.img-filters__form');
const imageFiltres = document.querySelector('.img-filters');

let currentStatusFiltres = 'filter-default';

const showFiltres = () => {
  imageFiltres.classList.remove('img-filters--inactive');
  document.querySelector('.img-filters__button--active').disabled = true;
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
  filtresForm.addEventListener('click', (evt) => {
    document.querySelector('.img-filters__button--active').disabled = false;
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentStatusFiltres = document.querySelector('.img-filters__button--active').id;
    if (currentStatusFiltres !== 'filter-random') {
      evt.target.disabled = true;
    }
    cb();
  });
};

export { showFiltres, getCurrentPhotos, initFiltresForm };
