import { initFileInput } from './form-file-input.js';
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

  if (!uploadFileInput || !uploadOverlay || !previewImage || !form || !cancelButton || !descriptionInput) {
    return;
  }

  initFileInput(uploadFileInput, uploadOverlay, previewImage);

  const closeForm = initFormClose(
    cancelButton,
    uploadOverlay,
    form,
    previewImage,
    descriptionInput,
    uploadFileInput
  );

  const pristine = initFormValidation(form);
  if (!pristine) {return;}

  form.addEventListener('submit', (evt) => {
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
  });
};

export { initUploadForm };
