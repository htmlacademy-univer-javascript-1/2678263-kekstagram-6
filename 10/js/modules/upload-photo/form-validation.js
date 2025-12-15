import {
  validateHashtagFormat,
  validateHashtagsCount,
  validateHashtagsUnique
} from './hashtags-validation.js';

const initFormValidation = (form) => {
  if (!form) {
    return null;
  }

  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'span',
    errorTextClass: 'form__error'
  });

  const hashtagsInput = form.querySelector('.text__hashtags');

  pristine.addValidator(
    hashtagsInput,
    validateHashtagFormat,
    'Введён невалидный хэш-тег',
    1,
    true
  );

  pristine.addValidator(
    hashtagsInput,
    validateHashtagsCount,
    'Нельзя указывать больше пяти хэш-тегов',
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

