import { renderComments } from './render-comments.js';
import { updateBigPictureUI } from './update-big-picture-ui.js';

const bigPictureElement = document.querySelector('.big-picture');

const getBigPictureElements = () => ({
  element: bigPictureElement,
  socialComments: bigPictureElement.querySelector('.social__comments'),
  likesCount: bigPictureElement.querySelector('.likes-count'),
  commentsCount: bigPictureElement.querySelector('.comments-count'),
  socialCaption: bigPictureElement.querySelector('.social__caption'),
  bigPictureImage: bigPictureElement.querySelector('.big-picture__img img'),
  commentCountBlock: bigPictureElement.querySelector('.social__comment-count'),
  commentsLoader: bigPictureElement.querySelector('.comments-loader'),
  cancelButton: bigPictureElement.querySelector('.big-picture__cancel'),
});

let currentBigPictureElements = null;

function onEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

function closeBigPicture() {
  currentBigPictureElements.element.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscKeydown);
  currentBigPictureElements = null;
}

const renderBigPicture = (photo) => {
  if (currentBigPictureElements) {
    closeBigPicture();
  }

  const bigPictureElements = getBigPictureElements();
  currentBigPictureElements = bigPictureElements;

  updateBigPictureUI(bigPictureElements, photo);

  renderComments(bigPictureElements.socialComments, photo.comments);

  if (bigPictureElements.commentCountBlock) {
    bigPictureElements.commentCountBlock.classList.add('hidden');
  }
  if (bigPictureElements.commentsLoader) {
    bigPictureElements.commentsLoader.classList.add('hidden');
  }

  bigPictureElements.element.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeydown);
  bigPictureElements.cancelButton.addEventListener('click', closeBigPicture, { once: true });
};

export { renderBigPicture };
