import { renderPhotos } from './thumbnail-rendering.js';
import './preview-rendering.js';
import './validation-upload-image.js';
import './setup-upload-image.js';
import { getData } from './api.js';
import { showErrorData } from './util.js';
import { setUserFormSubmit } from './submission-user-form.js';
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
