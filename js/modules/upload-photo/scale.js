import { INITIAL_SCALE, SCALE_MAX, SCALE_MIN, SCALE_STEP } from '../shared/constants.js';

let currentScale = INITIAL_SCALE;
let previewImage;
let scaleValueInput;
let scaleSmallerButton;
let scaleBiggerButton;

const applyScale = (value) => {
  currentScale = Math.min(SCALE_MAX, Math.max(SCALE_MIN, value));
  previewImage.style.transform = `scale(${currentScale / 100})`;
  scaleValueInput.value = `${currentScale}%`;
};

const onSmallerButtonClick = () => {
  applyScale(currentScale - SCALE_STEP);
};

const onBiggerButtonClick = () => {
  applyScale(currentScale + SCALE_STEP);
};

const initScale = () => {
  previewImage = document.querySelector('.img-upload__preview img');
  scaleValueInput = document.querySelector('.scale__control--value');
  scaleSmallerButton = document.querySelector('.scale__control--smaller');
  scaleBiggerButton = document.querySelector('.scale__control--bigger');

  if (!previewImage || !scaleValueInput || !scaleSmallerButton || !scaleBiggerButton) {
    return;
  }

  applyScale(INITIAL_SCALE);

  scaleSmallerButton.addEventListener('click', onSmallerButtonClick);
  scaleBiggerButton.addEventListener('click', onBiggerButtonClick);
};

const resetScale = () => {
  if (previewImage) {
    applyScale(INITIAL_SCALE);
  }
};

export { initScale, resetScale };
