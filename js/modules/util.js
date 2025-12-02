const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const toMinutes = (time) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

export {getRandomInteger, getRandomArrayElement, toMinutes};
