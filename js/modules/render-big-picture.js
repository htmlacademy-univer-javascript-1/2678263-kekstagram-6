import { renderComments, onLoadMoreClick, updateCommentCount, toggleLoadMoreButton } from './render-comments.js';
import { updateBigPictureUI } from './update-big-picture-ui.js';
import {
  initBigPictureState,
  getState,
  getRenderedCount,
  resetState
} from './big-picture-state.js';

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

function onEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

function closeBigPicture() {
  const state = getState();
  if (!state) {return;}
  const { elements } = state;
  state.elements.element.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  elements.commentsLoader.removeEventListener('click', onLoadMoreClick);
  resetState();
}

const renderBigPicture = (photo) => {
  const state = getState();
  if (state) {
    closeBigPicture();
  }
  const bigPictureElements = getBigPictureElements();
  initBigPictureState(photo, bigPictureElements);

  updateBigPictureUI(bigPictureElements, photo);

  bigPictureElements.socialComments.innerHTML = '';

  const initialComments = photo.comments.slice(0, getRenderedCount());
  renderComments(bigPictureElements.socialComments, initialComments);

  updateCommentCount(bigPictureElements);
  toggleLoadMoreButton(bigPictureElements);

  bigPictureElements.element.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeydown);
  bigPictureElements.cancelButton.addEventListener('click', closeBigPicture, { once: true });
  bigPictureElements.commentsLoader.addEventListener('click', onLoadMoreClick);
};

export { renderBigPicture };
