let currentMessageElement = null;
let currentOnEscKeydown = null;
let currentOnClickOutside = null;

function showMessage({
  type,
  title,
  onPrimaryAction,
  onContinue
}) {

  if (currentMessageElement) {
    hideCurrentMessage();
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

  element.classList.remove('hidden');

  if (title) {
    const titleEl = element.querySelector(`.${type}__title`);
    if (titleEl) {
      titleEl.textContent = title;
    }
  }

  const buttons = element.querySelectorAll(`.${type}__button`);

  if (buttons.length > 0) {
    buttons.forEach((btn) => {
      btn.addEventListener('click', (evt) => {
        evt.stopPropagation();

        if (btn.classList.contains('continue-button')) {
          hideCurrentMessage(() => {
            if (typeof onContinue === 'function') {
              onContinue();
            }
          });
        } else {
          hideCurrentMessage(() => {
            if (typeof onPrimaryAction === 'function') {
              onPrimaryAction();
            }
          });
        }
      });
    });
  }

  document.body.append(element);

  const inner = element.querySelector(`.${type}__inner`);
  if (inner) {
    inner.addEventListener('click', (evt) => {
      evt.stopPropagation();
    });
  }

  currentOnEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      if (!currentMessageElement) {
        return;
      }
      evt.preventDefault();
      evt.stopPropagation();
      hideCurrentMessage();
    }
  };

  currentOnClickOutside = (evt) => {
    if (currentMessageElement && inner && !inner.contains(evt.target)) {
      hideCurrentMessage();
    }
  };
  document.addEventListener('keydown', currentOnEscKeydown, { capture: true });
  document.addEventListener('click', currentOnClickOutside);
}

function hideCurrentMessage(callback) {
  if (currentOnEscKeydown) {
    document.removeEventListener('keydown', currentOnEscKeydown);
    currentOnEscKeydown = null;
  }
  if (currentOnClickOutside) {
    document.removeEventListener('click', currentOnClickOutside);
    currentOnClickOutside = null;
  }

  if (!currentMessageElement) {
    return;
  }

  currentMessageElement.remove();
  currentMessageElement = null;

  if (typeof callback === 'function') {
    callback();
  }
}

export { showMessage };
