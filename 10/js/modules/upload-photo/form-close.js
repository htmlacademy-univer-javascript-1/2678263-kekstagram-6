export const initFormClose = (
  cancelButton,
  uploadOverlay,
  form,
  previewImage,
  descriptionInput,
  uploadFileInput,
  hashtagsInput
) => {

  function closeForm() {
    uploadOverlay.classList.add('hidden');
    form.reset();
    uploadFileInput.value = '';
    URL.revokeObjectURL(previewImage.src);
    document.removeEventListener('keydown', onEscKeydown);
  }

  function onEscKeydown(evt) {
    if (evt.key === 'Escape') {
      if (
        document.activeElement === descriptionInput ||
        document.activeElement === hashtagsInput
      ) {
        return;
      }
      evt.preventDefault();
      closeForm();
    }
  }

  cancelButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeForm();
  });

  document.addEventListener('keydown', onEscKeydown);

  return closeForm;
};
