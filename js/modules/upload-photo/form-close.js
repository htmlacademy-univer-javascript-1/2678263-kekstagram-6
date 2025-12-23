export const initFormClose = (
  cancelButton,
  uploadOverlay,
  form,
  previewImage,
  uploadFileInput
) => {

  function closeForm() {
    uploadOverlay.classList.add('hidden');
    form.reset();
    uploadFileInput.value = '';
    URL.revokeObjectURL(previewImage.src);
    document.removeEventListener('keydown', onEscKeydown);
  }

  function onEscKeydown(evt) {
    if (evt.key === 'Escape' && !uploadOverlay.classList.contains('hidden')) {
      closeForm();
    }
  }

  document.addEventListener('keydown', onEscKeydown);

  cancelButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeForm();
  });

  return closeForm;
};
