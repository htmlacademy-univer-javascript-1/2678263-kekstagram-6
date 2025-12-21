import { showMessage } from './message.js';

let isVisible = false;

function showSuccessMessage() {
  if (isVisible) {return;}
  isVisible = true;
  showMessage({
    type: 'success',
    onHidden: () => { isVisible = false; }
  });
}


export { showSuccessMessage };
