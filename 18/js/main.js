import { renderPhotos } from './thumbnail-rendering.js';
import './preview-rendering.js';
import './upload-image/validation.js';
import './upload-image/modal-rendering.js';
import './upload-image/scale.js';
import './upload-image/filtres.js';
import { getData } from './api.js';
import { showErrorData } from './util.js';
import { setUserFormSubmit } from './upload-image/upload-handler.js';
import { showFiltres, initFiltresForm, getCurrentPhotos } from './thumbnail-filtres.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;

getData()
  .then((photos) => {
    renderPhotos(photos);
    showFiltres();
    initFiltresForm(debounce(() => renderPhotos(getCurrentPhotos(photos)), RERENDER_DELAY));
  })
  .catch(() => {
    showErrorData();
  }
  );

setUserFormSubmit();
