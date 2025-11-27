const NAMES = [
  'Иван',
  'Виктор',
  'Даниил',
  'Кристина',
  'Валерия',
  'Юлия',
  'Лилия',
  'Василий',
  'Кирилл',
  'Виктория',
  'Даниэла',
  'Мария',
  'Василиса',
  'Юрий',
  'Лариса',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTION = [
  'Я и мой кот',
  'Мы идем гулять!',
  'Смотри как он спит - самая частая фраза в доме, где есть кот',
  'Опять забыла купить корм коту - иду в магазин',
  'Закат прекрасен',
  'Малыш и кот',
  'Все любят котиков',
  'Мой кот - воришка',
  'Ужин готов!',
  'С днем рождения, любимый ...   КОТ))',
  'Прививки обновили. Кот не доволен, но это необходимо',
  'Классный вечер!',
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createCommentIdGenerator = () => {
  let currentId = 1;
  return () => currentId++;
};

const generateCommentId = createCommentIdGenerator();

const generateMessage = () => {
  const count = getRandomInteger(1, 2);
  return Array.from({length: count}, () => getRandomArrayElement(MESSAGE)).join(' ');
};

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: generateMessage(),
  name: getRandomArrayElement(NAMES),
});

const createCommentList = () => {
  const count = getRandomInteger(0, 30);
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push(createComment());
  }
  return comments;
};

const createPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(15, 200),
  comments: createCommentList(),
});

const createPhotosList = () => {
  const quantityPhotos = 25;
  const photos = [];
  for (let i = 1; i <= quantityPhotos; i++) {
    photos.push(createPhoto(i));
  }
  return photos;
};

export { createPhotosList };
