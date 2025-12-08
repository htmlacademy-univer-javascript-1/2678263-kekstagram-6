import { renderBigPicture } from './render-big-picture.js';

const createThumbnail = (photo) => {
  const template = document.querySelector('#picture');
  const thumbnail = template.content.cloneNode(true);
  const thumbnailImage = thumbnail.querySelector('.picture__img');
  thumbnailImage.src = photo.url;
  thumbnailImage.alt = photo.description;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

  thumbnail.querySelector('.picture').addEventListener('click', (evt) => {
    evt.preventDefault();
    renderBigPicture(photo);
  });

  return thumbnail;
};

const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();
  const container = document.querySelector('.pictures');

  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    fragment.appendChild(thumbnail);
  });

  container.appendChild(fragment);
};

export { renderThumbnails };
