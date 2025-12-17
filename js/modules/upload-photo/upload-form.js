import { initFormClose } from './form-close.js';
import { initFormValidation } from './form-validation.js';
import { showSuccessMessage } from './success-message.js';
import { showErrorMessage } from './error-message.js';
import { resetFormState } from './reset-form-state.js';

const initUploadForm = () => {
  const uploadFileInput = document.querySelector('#upload-file');
  const uploadOverlay = document.querySelector('.img-upload__overlay');
  const previewImage = document.querySelector('.img-upload__preview img');
  const form = document.querySelector('.img-upload__form');
  const cancelButton = document.querySelector('#upload-cancel');
  const descriptionInput = document.querySelector('.text__description');
  const hashtagsInput = document.querySelector('.text__hashtags');

  if (!uploadFileInput || !uploadOverlay || !previewImage || !form || !cancelButton || !descriptionInput || !hashtagsInput) {
    return;
  }

  const openForm = () => {
    uploadOverlay.classList.remove('hidden');

    const closeForm = initFormClose(
      cancelButton,
      uploadOverlay,
      form,
      previewImage,
      descriptionInput,
      uploadFileInput,
      hashtagsInput
    );

    const pristine = initFormValidation(form);

    const handleSubmit = (evt) => {
      evt.preventDefault();
      if (pristine.validate()) {
        try {
          showSuccessMessage();
          resetFormState(
            form,
            uploadFileInput,
            document.querySelector('.scale__control--value'),
            Array.from(document.querySelectorAll('.effects__radio')),
            previewImage
          );
          closeForm();
        } catch (err) {
          showErrorMessage();
        }
      }
    };

    form.removeEventListener('submit', handleSubmit);
    form.addEventListener('submit', handleSubmit);
  };

  uploadFileInput.addEventListener('change', (evt) => {
    const file = evt.target.files[0];
    if (file) {
      previewImage.src = URL.createObjectURL(file);
      openForm();
    }
  });
};

export { initUploadForm };
