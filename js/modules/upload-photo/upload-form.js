import { initFormClose } from './form-close.js';
import { initFormValidation } from './form-validation.js';
import { showSuccessMessage } from './success-message.js';
import { showErrorMessage } from './error-message.js';
import { resetFormState } from './reset-form-state.js';
import { sendData } from '../api/api.js';

const initUploadForm = () => {
  const uploadFileInput = document.querySelector('#upload-file');
  const uploadOverlay = document.querySelector('.img-upload__overlay');
  const previewImage = document.querySelector('.img-upload__preview img');
  const form = document.querySelector('.img-upload__form');
  const cancelButton = document.querySelector('#upload-cancel');
  const descriptionInput = document.querySelector('.text__description');
  const hashtagsInput = document.querySelector('.text__hashtags');
  const scaleValueInput = document.querySelector('.scale__control--value');
  const effectRadios = Array.from(document.querySelectorAll('.effects__radio'));
  const submitButton = form.querySelector('#upload-submit');

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

    const handleSubmit = async (evt) => {
      evt.preventDefault();
      if (pristine.validate()) {
        try {
          submitButton.disabled = true;
          const formData = new FormData(form);
          await sendData(formData);
          showSuccessMessage();
          resetFormState(
            form,
            uploadFileInput,
            scaleValueInput,
            effectRadios,
            previewImage
          );
          closeForm();
        } catch (err) {
          showErrorMessage();
        } finally {
          submitButton.disabled = false;
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
