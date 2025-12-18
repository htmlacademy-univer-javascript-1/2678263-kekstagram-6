import {MAX_HASHTAGS_COUNT} from './../shared/constants.js';

const arrHashtags = (value) => value
  .trim()
  .split(' ')
  .filter((tag) => tag.length > 0);

const validateHashtagFormat = (value) => {
  const tags = arrHashtags(value);
  return tags.every((tag) => /^#[\p{L}0-9_]{1,19}$/u.test(tag));
};

const validateHashtagsCount = (value) => {
  const tags = arrHashtags(value);
  return tags.length <= MAX_HASHTAGS_COUNT;
};

const validateHashtagsUnique = (value) => {
  const tags = arrHashtags(value);
  const lowercasedTags = tags.map((tag) => tag.toLowerCase());
  return new Set(lowercasedTags).size === lowercasedTags.length;
};

export {validateHashtagFormat, validateHashtagsCount, validateHashtagsUnique};
