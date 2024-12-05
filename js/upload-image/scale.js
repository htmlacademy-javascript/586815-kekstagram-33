const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

const scaleValueNode = document.querySelector('.scale__control--value');
const minusButtonNode = document.querySelector('.scale__control--smaller');
const plusButtonNode = document.querySelector('.scale__control--bigger');
const previewContainerNode = document.querySelector('.img-upload__preview');
const previewImageNode = previewContainerNode.querySelector('img');

let currentScaleValue = MAX_SCALE_VALUE;

const getScaleValue = () => {
  scaleValueNode.value = `${currentScaleValue}%`;
  previewImageNode.style.transform = `scale(${currentScaleValue / MAX_SCALE_VALUE})`;
};

const getScaleChange = (thisButton, otherButton, maxOrMinScaleValue, step) => {
  otherButton.disabled = false;
  if (currentScaleValue === maxOrMinScaleValue) {
    thisButton.disabled = true;
    currentScaleValue = maxOrMinScaleValue;
    scaleValueNode.value = `${maxOrMinScaleValue}%`;
  } else {
    currentScaleValue += step;
  }
  getScaleValue();
};


const resetScaleValue = () => {
  currentScaleValue = MAX_SCALE_VALUE;
  getScaleValue();
};

plusButtonNode.disabled = true;

const onPlusButtonClick = () => {
  getScaleChange(plusButtonNode, minusButtonNode, MAX_SCALE_VALUE, SCALE_STEP);
};

const onMinusButtonClick = () => {
  getScaleChange(minusButtonNode, plusButtonNode, MIN_SCALE_VALUE, -SCALE_STEP);
};

plusButtonNode.addEventListener('click', onPlusButtonClick);

minusButtonNode.addEventListener('click', onMinusButtonClick);

export { previewImageNode, resetScaleValue };
