import { getRandomInteger, getRandomArrayElement } from '../shared/util.js';
import {
  MAX_NUMBER_OF_AVATARS,
  MAX_NUMBER_OF_COMMENTS,
  MAX_NUMBER_OF_PHOTOS,
  MAX_NUMBER_OF_PHRASES,
  MIN_LIKES,
  MAX_LIKES,
  NAMES,
  MESSAGES,
  DESCRIPTIONS,
} from '../shared/constants.js';

const createCommentIdGenerator = () => {
  let currentId = 1;
  return () => currentId++;
};

const generateCommentId = createCommentIdGenerator();

const generateMessage = () => {
  const count = getRandomInteger(1, MAX_NUMBER_OF_PHRASES);
  return Array.from({length: count}, () => getRandomArrayElement(MESSAGES)).join(' ');
};

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, MAX_NUMBER_OF_AVATARS)}.svg`,
  message: generateMessage(),
  name: getRandomArrayElement(NAMES),
});

const createCommentList = () => {
  const count = getRandomInteger(0, MAX_NUMBER_OF_COMMENTS);
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push(createComment());
  }
  return comments;
};

const createPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: createCommentList(),
});

const createPhotosList = () => {
  const photos = [];
  for (let i = 1; i <= MAX_NUMBER_OF_PHOTOS; i++) {
    photos.push(createPhoto(i));
  }
  return photos;
};

export { createPhotosList };
