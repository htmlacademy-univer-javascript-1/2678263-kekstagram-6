const validateHashtagFormat = (value) => {
  if (!value.trim()) {
    return true;
  }

  const tags = value
    .split(' ')
    .filter((tag) => tag.length > 0);

  return tags.every((tag) => {
    if (!tag.startsWith('#')) {
      return false;
    }

    if ((tag.match(/#/g) || []).length > 1) {
      return false;
    }

    const body = tag.slice(1);
    if (!body) {
      return false;
    }

    return /^[\p{L}0-9_]+$/u.test(body);
  });
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
