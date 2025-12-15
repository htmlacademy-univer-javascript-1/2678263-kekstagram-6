export const initFileInput = (uploadFileInput, uploadOverlay, previewImage) => {
  if (!uploadFileInput || !uploadOverlay || !previewImage) {return;}

  uploadFileInput.addEventListener('change', () => {
    const file = uploadFileInput.files[0];
    if (!file) {return;}

    uploadOverlay.classList.remove('hidden');
    previewImage.src = URL.createObjectURL(file);
  });
};
