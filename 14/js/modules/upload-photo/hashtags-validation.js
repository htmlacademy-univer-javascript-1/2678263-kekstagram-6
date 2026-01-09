import {MAX_HASHTAGS_COUNT} from './../shared/constants.js';

const arrHashtags = (value) => value
  .trim()
  .split(' ')
  .filter((tag) => tag.length > 0);


const validateHashtagStartsWithHash = (value) => {
  const tags = arrHashtags(value);
  if (!tags.length) {return true;}
  return tags.every((tag) => tag.startsWith('#'));
};

const validateHashtagNotOnlyHash = (value) => {
  const tags = arrHashtags(value);
  if (!tags.length) {return true;}
  return tags.every((tag) => tag.length > 1);
};

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


export {validateHashtagStartsWithHash, validateHashtagNotOnlyHash, validateHashtagFormat, validateHashtagsCount, validateHashtagsUnique};
