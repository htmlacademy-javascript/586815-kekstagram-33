const ALERT_SHOW_TIME = 5000;

const templateErrorData = document.querySelector('#data-error').content.querySelector('.data-error');

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showErrorData = () => {
  const fragment = document.createDocumentFragment();
  const errorContainer = templateErrorData.cloneNode(true);
  fragment.appendChild(errorContainer);
  document.body.appendChild(fragment);

  setTimeout(() => {
    errorContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { getRandomInteger, isEscapeKey, showErrorData};
