import { initFormClose } from './form-close.js';
import { initFormValidation } from './form-validation.js';
import { showMessage } from './message.js';
import { resetFormState } from './reset-form-state.js';
import { sendData } from '../api/api.js';
import { initScale} from './scale.js';

const initUploadForm = () => {
  const uploadFileInput = document.querySelector('#upload-file');
  const uploadOverlay = document.querySelector('.img-upload__overlay');
  const previewImage = document.querySelector('.img-upload__preview img');
  const form = document.querySelector('.img-upload__form');
  const cancelButton = document.querySelector('#upload-cancel');
  const descriptionInput = document.querySelector('.text__description');
  const hashtagsInput = document.querySelector('.text__hashtags');
  const effectRadios = Array.from(document.querySelectorAll('.effects__radio'));
  const submitButton = form.querySelector('#upload-submit');

  if (!uploadFileInput || !uploadOverlay || !previewImage || !form || !cancelButton || !descriptionInput || !hashtagsInput) {
    return;
  }

  let currentObjectURL = null;

  const revokeCurrentObjectURL = () => {
    if (currentObjectURL) {
      URL.revokeObjectURL(currentObjectURL);
      currentObjectURL = null;
    }
  };

  const updateEffectPreviews = () => {
    const effectPreviews = document.querySelectorAll('.effects__preview');
    effectPreviews.forEach((preview) => {
      preview.innerHTML = '';
      preview.style.backgroundImage = `url(${previewImage.src})`;
      preview.style.backgroundSize = 'cover';
      preview.style.backgroundPosition = 'center';
      preview.style.backgroundRepeat = 'no-repeat';
    });
  };

  let currentSubmitHandler = null;
  let currentPristine = null;

  const openForm = () => {
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');

    initScale();

    const closeForm = initFormClose(
      cancelButton,
      uploadOverlay,
      form,
      previewImage,
      descriptionInput,
      uploadFileInput,
      hashtagsInput,
      revokeCurrentObjectURL
    );

    if (currentSubmitHandler) {
      form.removeEventListener('submit', currentSubmitHandler);
    }

    currentPristine = initFormValidation(form);

    const handleSubmit = async (evt) => {
      evt.preventDefault();
      if (currentPristine.validate()) {
        try {
          submitButton.disabled = true;
          const formData = new FormData(form);
          await sendData(formData);
          showMessage({ type: 'success' });
          resetFormState(form, uploadFileInput, effectRadios, previewImage);
          closeForm();
        } catch (err) {
          showMessage({ type: 'error' });
        } finally {
          submitButton.disabled = false;
        }
      }
    };

    currentSubmitHandler = handleSubmit;
    form.addEventListener('submit', currentSubmitHandler);
  };

  uploadFileInput.addEventListener('change', (evt) => {
    const file = evt.target.files[0];
    if (file) {

      revokeCurrentObjectURL();

      currentObjectURL = URL.createObjectURL(file);
      previewImage.src = currentObjectURL;

      openForm();

      updateEffectPreviews();
    }
  });
};

export { initUploadForm };
