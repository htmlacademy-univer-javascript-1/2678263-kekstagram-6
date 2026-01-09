import { COMMENTS_STEP } from '../shared/constants.js';

let photoData = null;
let domElements = null;
let renderedCount = 0;

const getState = () => {
  if (!photoData || !domElements) {
    return null;
  }
  return {
    photo: photoData,
    elements: domElements,
    renderedCount: renderedCount
  };
};

const initBigPictureState = (photo, elements) => {
  photoData = photo;
  domElements = elements;
  renderedCount = Math.min(COMMENTS_STEP, photo.comments.length);
  return getState();
};

const loadMoreComments = () => {
  if (!photoData) {
    return [];
  }
  const start = renderedCount;
  const end = Math.min(start + COMMENTS_STEP, photoData.comments.length);
  const newComments = photoData.comments.slice(start, end);
  renderedCount = end;

  return newComments;
};

const isAllCommentsLoaded = () => !photoData || renderedCount >= photoData.comments.length;

const getRenderedCount = () => renderedCount;

const getTotalComments = () => photoData ? photoData.comments.length : 0;

const resetState = () => {
  photoData = null;
  domElements = null;
  renderedCount = 0;
};

export {
  getState,
  initBigPictureState,
  loadMoreComments,
  isAllCommentsLoaded,
  getRenderedCount,
  getTotalComments,
  resetState
};
