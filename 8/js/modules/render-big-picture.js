const createBigPictureRenderer = () => {
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
      fragment.append(commentElement);
    });

    socialComments.append(fragment);
  };

  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeBigPicture();
    }
  };

  function closeBigPicture() {
    if (!currentBigPictureElements) {return;}

    currentBigPictureElements.element.classList.add('hidden');
    document.body.classList.remove('modal-open');

    document.removeEventListener('keydown', onEscKeydown);
    currentBigPictureElements = null;
  }

  const renderBigPictureInner = (photo) => {
    if (currentBigPictureElements) {
      closeBigPicture();
    }

    const elements = getBigPictureElements();
    currentBigPictureElements = elements;

    elements.bigPictureImage.src = photo.url;
    elements.bigPictureImage.alt = photo.description || '';
    elements.socialCaption.textContent = photo.description || '';
    elements.likesCount.textContent = photo.likes;
    elements.commentsCount.textContent = photo.comments.length;

    renderComments(photo.comments);

    if (elements.commentCountBlock) {
      elements.commentCountBlock.classList.add('hidden');
    }
    if (elements.commentsLoader) {
      elements.commentsLoader.classList.add('hidden');
    }

    elements.element.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onEscKeydown);
    elements.cancelButton.addEventListener('click', closeBigPicture, { once: true });
  };

  return { renderBigPicture: renderBigPictureInner };
};

const { renderBigPicture } = createBigPictureRenderer();

export { renderBigPicture };
