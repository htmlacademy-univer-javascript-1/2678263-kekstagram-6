import { COMMENTS_STEP } from './constants.js';

let photoData = null;
let domElements = null;
let renderedCount = 0;

export const getState = () => {
  if (!photoData || !domElements) {
    return null;
  }
  return {
    photo: photoData,
    elements: domElements,
    renderedCount: renderedCount
  };
};

export const initBigPictureState = (photo, elements) => {
  photoData = photo;
  domElements = elements;
  renderedCount = Math.min(COMMENTS_STEP, photo.comments.length);
  return getState();
};

export const loadMoreComments = () => {
  if (!photoData) {
    return [];
  }
  const start = renderedCount;
  const end = Math.min(start + COMMENTS_STEP, photoData.comments.length);
  const newComments = photoData.comments.slice(start, end);
  renderedCount = end;

  return newComments;
};

export const isAllCommentsLoaded = () => !photoData || renderedCount >= photoData.comments.length;

export const getRenderedCount = () => renderedCount;

export const getTotalComments = () => photoData ? photoData.comments.length : 0;

export const resetState = () => {
  photoData = null;
  domElements = null;
  renderedCount = 0;
};
