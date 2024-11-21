import {renderPhotos } from './thumbnail-rendering.js';
import './preview-rendering.js';
import './validation-upload-image.js';
import './setup-upload-image.js';
import { getData } from './api.js';
import { showErrorData } from './util.js';
import { setUserFormSubmit } from './submission-user-form.js';

getData()
  .then((photos) => {
    renderPhotos(photos);
  })
  .catch(() => {
    showErrorData();
  }
  );

setUserFormSubmit();
