import {
  validateHashtagStartsWithHash,
  validateHashtagNotOnlyHash,
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
    'После символа # хэш-тег должен содержать только буквы, цифры и знак подчёркивания - не более 20 символов',
    1,
    true
  );

  pristine.addValidator(
    hashtagsInput,
    validateHashtagNotOnlyHash,
    'Хэш-тег не может состоять только из символа #',
    2,
    true
  );

  pristine.addValidator(
    hashtagsInput,
    validateHashtagStartsWithHash,
    'Хэш-тег должен начинаться с символа #',
    3,
    true
  );

  pristine.addValidator(
    hashtagsInput,
    validateHashtagsCount,
    `Нельзя указывать больше ${MAX_HASHTAGS_COUNT} хэш-тегов`,
    4,
    true
  );

  pristine.addValidator(
    hashtagsInput,
    validateHashtagsUnique,
    'Хэш-теги не должны повторяться',
    5,
    true
  );

  return pristine;
};

export { initFormValidation };
