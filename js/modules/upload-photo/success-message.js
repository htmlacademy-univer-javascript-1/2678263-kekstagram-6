let successElement = null;

function showSuccessMessage() {
  if (successElement) {return;}

  const template = document.querySelector('#success');
  if (!template) {return;}

  const successSection = template.content.querySelector('.success');
  if (!successSection) {return;}

  successElement = successSection.cloneNode(true);

  document.body.append(successElement);

  const button = successElement.querySelector('.success__button');
  if (button) {
    button.addEventListener('click', hideSuccessMessage);
  }

  document.addEventListener('keydown', onEscKeydown);

  setTimeout(() => {
    document.addEventListener('click', onClickOutside);
  }, 0);
}

function hideSuccessMessage() {
  if (!successElement) {return;}

  const button = successElement.querySelector('.success__button');
  if (button) {
    button.removeEventListener('click', hideSuccessMessage);
  }
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onClickOutside);

  successElement.remove();
  successElement = null;
}

function onEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideSuccessMessage();
  }
}

function onClickOutside(evt) {
  if (successElement) {
    const inner = successElement.querySelector('.success__inner');
    if (inner && !inner.contains(evt.target)) {
      hideSuccessMessage();
    }
  }
}

export { showSuccessMessage, hideSuccessMessage };
