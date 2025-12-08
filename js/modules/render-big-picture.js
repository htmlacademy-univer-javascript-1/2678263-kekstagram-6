const createBigPictureElement = () => {
  const bigPicture = document.querySelector('.big-picture');
  return {
    element: bigPicture,
    socialComments: bigPicture.querySelector('.social__comments'),
    likesCount: bigPicture.querySelector('.likes-count'),
    commentsCount: bigPicture.querySelector('.comments-count'),
    socialCaption: bigPicture.querySelector('.social__caption'),
    bigPictureImage: bigPicture.querySelector('.big-picture__img img'),
    commentCountBlock: bigPicture.querySelector('.social__comment-count'),
    commentsLoader: bigPicture.querySelector('.comments-loader'),
    cancelButton: bigPicture.querySelector('.big-picture__cancel'),
  };
};

let currentBigPictureElements = null;
let closeHandler = null;

const renderComments = (comments) => {
  if (!currentBigPictureElements) {return;}

  const { socialComments } = currentBigPictureElements;
  socialComments.innerHTML = '';

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
    fragment.appendChild(commentElement);
  });

  socialComments.appendChild(fragment);
};

const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    if (typeof closeHandler === 'function') {
      closeHandler();
    }
  }
};

const closeBigPicture = () => {
  if (!currentBigPictureElements) { return; }

  currentBigPictureElements.element.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscKeydown);

  currentBigPictureElements = null;

  closeHandler = null;
};

const renderBigPicture = (photo) => {

  if (currentBigPictureElements) {
    closeBigPicture();
  }

  const elements = createBigPictureElement();
  currentBigPictureElements = elements;

  elements.bigPictureImage.src = photo.url;
  elements.bigPictureImage.alt = photo.description;
  elements.socialCaption.textContent = photo.description;
  elements.likesCount.textContent = photo.likes;
  elements.commentsCount.textContent = photo.comments.length;

  renderComments(photo.comments);

  elements.commentCountBlock.classList.add('hidden');
  elements.commentsLoader.classList.add('hidden');

  elements.element.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeydown);
  elements.cancelButton.addEventListener('click', closeBigPicture, { once: true });
};

export { renderBigPicture };
