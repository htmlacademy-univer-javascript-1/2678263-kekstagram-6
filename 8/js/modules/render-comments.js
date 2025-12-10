const renderComments = (container, comments) => {
  container.innerHTML = '';
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

export { renderComments };
