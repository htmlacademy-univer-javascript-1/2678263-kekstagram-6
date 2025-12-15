import {
  getState,
  getTotalComments,
  isAllCommentsLoaded,
  loadMoreComments,
  getRenderedCount
} from './big-picture-state.js';

const renderComments = (container, comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach(({ avatar, name, message }) => {
    const commentElement = document.createElement('li');
    commentElement.className = 'social__comment';

    const img = document.createElement('img');
    img.className = 'social__picture';
    img.src = avatar;
    img.alt = name;
    img.width = 35;
    img.height = 35;

    const text = document.createElement('p');
    text.className = 'social__text';
    text.textContent = message;

    commentElement.append(img, text);
    fragment.append(commentElement);
  });

  container.append(fragment);
};

function onLoadMoreClick() {
  const state = getState();
  if (!state) {return;}

  const newComments = loadMoreComments();
  renderComments(state.elements.socialComments, newComments);

  updateCommentCount(state.elements);
  toggleLoadMoreButton(state.elements);
}

function updateCommentCount(elements) {
  if(getTotalComments() === 0) {
    elements.commentCountBlock.innerHTML = 'нет комментариев';
  } else {
    elements.commentCountBlock.innerHTML =
      `${getRenderedCount()} из <span class="comments-count">${getTotalComments()}</span> комментариев`;
  }
}

function toggleLoadMoreButton(elements) {
  elements.commentsLoader.classList.toggle('hidden', isAllCommentsLoaded());
}

export { renderComments, onLoadMoreClick, updateCommentCount, toggleLoadMoreButton };
