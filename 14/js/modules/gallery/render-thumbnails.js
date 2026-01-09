import { renderBigPicture } from '../big-picture/render-big-picture.js';

const createThumbnail = (photo) => {
  const template = document.querySelector('#picture');
  const thumbnail = template.content.cloneNode(true);
  const thumbnailImage = thumbnail.querySelector('.picture__img');
  const thumbnailLikes = thumbnail.querySelector('.picture__likes');
  const thumbnailComments = thumbnail.querySelector('.picture__comments');

  thumbnailImage.src = photo.url;
  thumbnailImage.alt = photo.description;
  thumbnailLikes.textContent = photo.likes;
  thumbnailComments.textContent = photo.comments.length;

  const thumbnailContainer = thumbnail.querySelector('.picture');
  thumbnailContainer.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderBigPicture(photo);
  });

  return thumbnail;
};

const clearThumbnails = () => {
  const thumbnails = document.querySelectorAll('.pictures .picture');
  thumbnails.forEach((thumb) => thumb.remove());
};

const renderThumbnails = (photos) => {
  clearThumbnails();

  const fragment = document.createDocumentFragment();
  const container = document.querySelector('.pictures');

  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    fragment.appendChild(thumbnail);
  });

  container.appendChild(fragment);
};

export { renderThumbnails, clearThumbnails };
