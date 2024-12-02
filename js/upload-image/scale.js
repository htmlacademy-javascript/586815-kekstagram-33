const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

const scaleValueNode = document.querySelector('.scale__control--value');
const decreaseScaleButtonNode = document.querySelector('.scale__control--smaller');
const increaseScaleButtonNode = document.querySelector('.scale__control--bigger');
const previewContainerNode = document.querySelector('.img-upload__preview');
const previewImageNode = previewContainerNode.querySelector('img');

let currentScaleValue = MAX_SCALE_VALUE;

const getScaleValue = () => {
  scaleValueNode.value = `${currentScaleValue}%`;
  previewImageNode.style.transform = `scale(${currentScaleValue / MAX_SCALE_VALUE})`;
};

function getChangeScale(thisButton, otherButton, maxOrMinScaleValue, step) {
  return function () {
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
}

increaseScaleButtonNode.disabled = true;

increaseScaleButtonNode.addEventListener('click', getChangeScale(increaseScaleButtonNode, decreaseScaleButtonNode, MAX_SCALE_VALUE, SCALE_STEP));

decreaseScaleButtonNode.addEventListener('click', getChangeScale(decreaseScaleButtonNode, increaseScaleButtonNode, MIN_SCALE_VALUE, -SCALE_STEP));

export { previewImageNode };
