let currentMessageElement = null;
let currentOnEscKeydown = null;
let currentOnClickOutside = null;

function showMessage({
  type,
  title,
  buttonText,
  onHidden = () => {},
  useCaptureOnEsc = false
}) {
  if (currentMessageElement) {
    return;
  }

  const template = document.querySelector(`#${type}`);
  if (!template) {
    return;
  }

  const section = template.content.querySelector(`.${type}`);
  if (!section) {
    return;
  }

  const element = section.cloneNode(true);
  currentMessageElement = element;

  if (title !== undefined) {
    const titleEl = element.querySelector(`.${type}__title`);
    if (titleEl) {
      titleEl.textContent = title;
    }
  }

  const button = element.querySelector(`.${type}__button`);
  if (buttonText !== undefined) {
    if (button) {
      button.textContent = buttonText;
    }
  }

  document.body.append(element);

  if (button) {
    button.addEventListener('click', (evt) => {
      evt.stopPropagation();
      hideCurrentMessage(onHidden);
    });
  }

  const inner = element.querySelector(`.${type}__inner`);
  if (inner) {
    inner.addEventListener('click', (evt) => {
      evt.stopPropagation();
    });
  }

  currentOnEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
      evt.preventDefault();
      hideCurrentMessage(onHidden);
    }
  };

  currentOnClickOutside = (evt) => {
    if (currentMessageElement && inner && !inner.contains(evt.target)) {
      hideCurrentMessage(onHidden);
    }
  };

  document.addEventListener('keydown', currentOnEscKeydown, { capture: useCaptureOnEsc });
  document.addEventListener('click', currentOnClickOutside);
}

function hideCurrentMessage(onHidden) {
  if (!currentMessageElement) {
    return;
  }

  currentMessageElement.remove();
  currentMessageElement = null;

  document.removeEventListener('keydown', currentOnEscKeydown);
  document.removeEventListener('click', currentOnClickOutside);

  currentOnEscKeydown = null;
  currentOnClickOutside = null;

  if (typeof onHidden === 'function') {
    onHidden();
  }
}

export { showMessage };
