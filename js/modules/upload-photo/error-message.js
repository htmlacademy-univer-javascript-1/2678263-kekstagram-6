let errorElement = null;

function showErrorMessage() {
  if (errorElement) {return;}

  const template = document.querySelector('#error');
  if (!template) {return;}

  const errorSection = template.content.querySelector('.error');
  if (!errorSection) {
    return;
  }
  errorElement = errorSection.cloneNode(true);

  document.body.append(errorElement);

  const button = errorElement.querySelector('.error__button');
  if (button) {
    button.addEventListener('click', hideErrorMessage);
  }

  document.addEventListener('keydown', onEscKeydown);

  setTimeout(() => {
    document.addEventListener('click', onClickOutside);
  }, 0);
}

function hideErrorMessage() {
  if (!errorElement) {return;}

  const button = errorElement.querySelector('.error__button');
  if (button) {
    button.removeEventListener('click', hideErrorMessage);
  }
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onClickOutside);

  errorElement.remove();
  errorElement = null;
}

function onEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideErrorMessage();
  }
}

function onClickOutside(evt) {
  if (!errorElement) {return;}

  const inner = errorElement.querySelector('.error__inner');
  if (inner && !inner.contains(evt.target)) {
    hideErrorMessage();
  }
}

export {showErrorMessage, hideErrorMessage};
