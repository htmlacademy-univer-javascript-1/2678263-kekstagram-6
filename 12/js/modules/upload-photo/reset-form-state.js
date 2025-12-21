export const resetFormState = (
  form,
  uploadFileInput,
  scaleValueInput,
  effectRadios,
  previewImage
) => {
  form.reset();
  uploadFileInput.value = '';

  if (scaleValueInput) {
    scaleValueInput.value = '100%';
  }

  const originalRadio = effectRadios.find((radio) => radio.value === 'none');
  if (originalRadio) {
    originalRadio.checked = true;
    if (previewImage) {
      previewImage.style.filter = '';
    }
  }
};
