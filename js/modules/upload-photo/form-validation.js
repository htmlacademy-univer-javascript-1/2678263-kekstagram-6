import {
  validateHashtagFormat,
  validateHashtagsCount,
  validateHashtagsUnique
} from './hashtags-validation.js';
import { MAX_HASHTAGS_COUNT } from './../shared/constants.js';

const initFormValidation = (form) => {
  if (!form) {
    return null;
  }

  const hashtagsInput = form.querySelector('.text__hashtags');

  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'span',
    errorTextClass: 'form__error'
  });

  pristine.addValidator(
    hashtagsInput,
    validateHashtagFormat,
    'Хэш-тег должен состоять из символов # и от 1 до 19 букв, цифр и знака подчеркивания',
    1,
    true
  );

  pristine.addValidator(
    hashtagsInput,
    validateHashtagsCount,
    `Нельзя указывать больше ${MAX_HASHTAGS_COUNT} хэш-тегов`,
    2,
    true
  );

  pristine.addValidator(
    hashtagsInput,
    validateHashtagsUnique,
    'Хэш-теги не должны повторяться',
    3,
    true
  );

  return pristine;
};

export { initFormValidation };
