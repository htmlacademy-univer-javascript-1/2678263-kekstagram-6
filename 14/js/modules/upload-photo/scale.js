import { INITIAL_SCALE, SCALE_MAX, SCALE_MIN, SCALE_STEP } from '../shared/constants.js';

const uploadForm = document.querySelector('.img-upload__form');
const previewImage = uploadForm.querySelector('.img-upload__preview img');
const scaleSmallerButton = uploadForm.querySelector('.scale__control--smaller');
const scaleBiggerButton = uploadForm.querySelector('.scale__control--bigger');
const scaleValueInput = uploadForm.querySelector('.scale__control--value');

let currentScale = INITIAL_SCALE;

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

const resetScale = () => {
  currentScale = INITIAL_SCALE;
  applyScale(INITIAL_SCALE);
};

applyScale(INITIAL_SCALE);

scaleSmallerButton.addEventListener('click', onSmallerButtonClick);
scaleBiggerButton.addEventListener('click', onBiggerButtonClick);

export { resetScale };
