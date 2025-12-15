const validateHashtagFormat = (value) => {
  if (!value.trim()) {
    return true;
  }

  const tags = value
    .split(' ')
    .filter((tag) => tag.length > 0);

  return tags.every((tag) => /^#[\p{L}0-9_]{1,19}$/u.test(tag));
};

const validateHashtagsCount = (value) => {
  if (!value.trim()) {
    return true;
  }

  const tags = value
    .split(' ')
    .filter((tag) => tag.length > 0);

  return tags.length <= 5;
};

const validateHashtagsUnique = (value) => {
  if (!value.trim()) {
    return true;
  }

  const tags = value
    .toLowerCase()
    .split(' ')
    .filter((tag) => tag.length > 0);

  return new Set(tags).size === tags.length;
};

export {validateHashtagFormat, validateHashtagsCount, validateHashtagsUnique};
