import { clearThumbnails } from './render-thumbnails.js';
import { NUMBER_OF_PHOTOS_PER_PAGE, RERENDER_DELAY } from '../shared/constants.js';
import { debounce } from '../shared/util.js';

const getRandomUnique = (array, count) => {
  const randomArray = [...array];
  randomArray.sort(() => Math.random() - 0.5);
  return randomArray.slice(0, count);
};

const getDiscussed = (array) => {
  const sorted = [...array];
  sorted.sort((a, b) => {
    const aComments = Array.isArray(a.comments) ? a.comments.length : 0;
    const bComments = Array.isArray(b.comments) ? b.comments.length : 0;
    return bComments - aComments;
  });

  return sorted;
};

const updatePictures = (filterType, pictures, renderFn) => {
  let result;

  if (filterType === 'random') {
    result = getRandomUnique(pictures, NUMBER_OF_PHOTOS_PER_PAGE);
  } else if (filterType === 'discussed') {
    result = getDiscussed(pictures);
  } else {
    result = pictures;
  }
  clearThumbnails();
  renderFn(result);
};

const setActiveButton = (buttonId) => {
  const buttons = document.querySelectorAll('.img-filters__button');
  buttons.forEach((btn) => {
    btn.classList.toggle('img-filters__button--active', btn.id === buttonId);
  });
};

const setupButton = (id, filterType, setActive, updateFn) => {
  const button = document.getElementById(id);
  if (button) {
    button.addEventListener('click', () => {
      setActive(id);
      updateFn(filterType);
    });
  }
};
const initFilters = (pictures, renderFn) => {
  const filtersContainer = document.querySelector('.img-filters');

  if (!filtersContainer || !pictures || !pictures.length) {
    return;
  }

  filtersContainer.classList.remove('img-filters--inactive');

  const debouncedUpdate = debounce((filterType) => {
    updatePictures(filterType, pictures, renderFn);
  }, RERENDER_DELAY);

  setupButton('filter-default', 'default', setActiveButton, debouncedUpdate);
  setupButton('filter-random', 'random', setActiveButton, debouncedUpdate);
  setupButton('filter-discussed', 'discussed', setActiveButton, debouncedUpdate);

  updatePictures('default', pictures, renderFn);
};

export { initFilters };
