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
    document.body.classList.remove('modal-open');
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

      if (!uploadOverlay.classList.contains('hidden')) {
        closeForm();
      }
    }
  }

  document.addEventListener('keydown', onEscKeydown);

  cancelButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeForm();
  });

  return closeForm;
};
