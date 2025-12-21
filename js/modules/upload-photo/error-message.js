import { showMessage } from './message.js';

let isVisible = false;

function showErrorMessage() {
  if (isVisible) {return;}

  isVisible = true;

  showMessage({
    type: 'error',
    onHidden: () => {
      isVisible = false;
    },
    useCaptureOnEsc: true
  });
}

export { showErrorMessage };
