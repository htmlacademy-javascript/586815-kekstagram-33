import './../vendor/nouislider/nouislider.js';

//масштаб
const SCALE_STEP = 25;
const START_SCALE_VALUE = 100;

const scaleValue = document.querySelector('.scale__control--value');
const decreaseScaleButton = document.querySelector('.scale__control--smaller');
const increaseScaleButton = document.querySelector('.scale__control--bigger');
const previewBox = document.querySelector('.img-upload__preview');
const previewImage = previewBox.querySelector('img');

//Эффекты
const sliderEffects = document.querySelector('.effect-level__slider');
const valueEffects = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.img-upload__effects');
const noneEffect = document.getElementById('effect-none');
const sliderBox = document.querySelector('.img-upload__effect-level');

let currentScaleValue = START_SCALE_VALUE;

const getScaleValue = () => {
  scaleValue.value = `${currentScaleValue}%`;
  previewImage.style.transform = `scale(${currentScaleValue / START_SCALE_VALUE})`;
};

function getChangeScale(thisButton, otherButton, maxScaleValue, step) {
  return function () {
    otherButton.disabled = false;
    currentScaleValue = currentScaleValue + step;
    if (currentScaleValue === maxScaleValue) {
      thisButton.disabled = true;
    }
    getScaleValue(currentScaleValue);
  };
}

increaseScaleButton.disabled = true;

increaseScaleButton.addEventListener('click', getChangeScale(increaseScaleButton, decreaseScaleButton, START_SCALE_VALUE, SCALE_STEP));

decreaseScaleButton.addEventListener('click', getChangeScale(decreaseScaleButton, increaseScaleButton, SCALE_STEP, -SCALE_STEP));

noUiSlider.create(sliderEffects, {
  range: {
    min: 0,
    max: 1,
  },
  connect: 'lower',
  start: 1,
  step: 0.1,
});

let currentId = noneEffect.id;

const resetEffectsSlider = () => {
  sliderBox.classList.add('hidden');
  previewImage.style.filter = 'none';
};

const checkStatusEffects = (id) => {
  if (id === 'effect-none') {
    resetEffectsSlider();
  } else {
    sliderBox.classList.remove('hidden');
  }
};

checkStatusEffects(currentId);

effectsList.addEventListener('change', (event) => {
  if (event.target.checked) {
    currentId = event.target.id;
    updateSlider(currentId);
    getStyleEffect(currentId, sliderEffects.noUiSlider.options.range.max);
    checkStatusEffects(currentId);
  }
});

function getStyleEffect(id, value) {
  switch (id) {
    case 'effect-chrome':
      previewImage.style.filter = `grayscale(${value})`;
      break;
    case 'effect-sepia':
      previewImage.style.filter = `sepia(${value})`;
      break;
    case 'effect-marvin':
      previewImage.style.filter = `invert(${value}%)`;
      break;
    case 'effect-phobos':
      previewImage.style.filter = `blur(${value}px)`;
      break;
    case 'effect-heat':
      previewImage.style.filter = `brightness(${value})`;
      break;
    case 'effect-none':
      previewImage.style.filter = 'none';
      break;
    default:
      previewImage.style.filter = 'none';
  }
}

function updateSlider(id) {
  switch (id) {
    case 'effect-chrome':
    case 'effect-sepia':
      sliderEffects.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });
      break;
    case 'effect-marvin':
      sliderEffects.noUiSlider.updateOptions({
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
      sliderEffects.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1
      });
      break;
    case 'effect-heat':
      sliderEffects.noUiSlider.updateOptions({
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

sliderEffects.noUiSlider.on('update', () => {
  valueEffects.value = sliderEffects.noUiSlider.get();
  getStyleEffect(currentId, valueEffects.value);
});

export { resetEffectsSlider };
