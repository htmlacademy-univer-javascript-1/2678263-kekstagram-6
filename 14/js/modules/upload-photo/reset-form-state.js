import { resetScale } from './scale.js';
export const resetFormState = (
  form,
  uploadFileInput,
  effectRadios,
  previewImage
) => {
  form.reset();
  uploadFileInput.value = '';

  resetScale();

  const originalRadio = effectRadios.find((radio) => radio.value === 'none');
  if (originalRadio) {
    originalRadio.checked = true;
    if (previewImage) {
      previewImage.style.filter = '';
    }
  }
};
