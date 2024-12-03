import '../../vendor/nouislider/nouislider.js';
import { previewImageNode } from './scale.js';

const sliderContainerNode = document.querySelector('.img-upload__effect-level');
const sliderEffectsNode = sliderContainerNode.querySelector('.effect-level__slider');
const valueEffectsNode = sliderContainerNode.querySelector('.effect-level__value');
const effectsListNode = document.querySelector('.img-upload__effects');
let currentId = document.getElementById('effect-none').id;

noUiSlider.create(sliderEffectsNode, {
  range: {
    min: 0,
    max: 1,
  },
  connect: 'lower',
  start: 1,
  step: 0.1,
  format: {
    to: (value) => parseFloat(value.toFixed(1)),
    from: (value) => Number(value),
  },
});

const resetEffectsSlider = () => {
  sliderContainerNode.classList.add('hidden');
  previewImageNode.style.filter = 'none';
};

const checkStatusEffects = (id) => (id === 'effect-none') ? resetEffectsSlider() : sliderContainerNode.classList.remove('hidden');

checkStatusEffects(currentId);

effectsListNode.addEventListener('change', (event) => {
  if (event.target.checked) {
    currentId = event.target.id;
    updateSlider(currentId);
    getStyleEffect(currentId, sliderEffectsNode.noUiSlider.options.range.max);
    checkStatusEffects(currentId);
  }
});

function getStyleEffect(id, value) {
  switch (id) {
    case 'effect-chrome':
      previewImageNode.style.filter = `grayscale(${value})`;
      break;
    case 'effect-sepia':
      previewImageNode.style.filter = `sepia(${value})`;
      break;
    case 'effect-marvin':
      previewImageNode.style.filter = `invert(${value}%)`;
      break;
    case 'effect-phobos':
      previewImageNode.style.filter = `blur(${value}px)`;
      break;
    case 'effect-heat':
      previewImageNode.style.filter = `brightness(${value})`;
      break;
    case 'effect-none':
      previewImageNode.style.filter = 'none';
      break;
    default:
      previewImageNode.style.filter = 'none';
  }
}

function updateSlider(id) {
  switch (id) {
    case 'effect-chrome':
    case 'effect-sepia':
      sliderEffectsNode.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });
      break;
    case 'effect-marvin':
      sliderEffectsNode.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100
        },
        start: 100,
        step: 1,
        format: {
          to: function (value) {
            return parseFloat(value);
          },
          from: function (value) {
            return parseFloat(value);
          }
        }
      });
      break;
    case 'effect-phobos':
      sliderEffectsNode.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1
      });
      break;
    case 'effect-heat':
      sliderEffectsNode.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3
        },
        start: 3,
        step: 0.1
      });
      break;
  }
}

sliderEffectsNode.noUiSlider.on('update', () => {
  valueEffectsNode.value = sliderEffectsNode.noUiSlider.get();
  getStyleEffect(currentId, valueEffectsNode.value);
});

export { resetEffectsSlider };
