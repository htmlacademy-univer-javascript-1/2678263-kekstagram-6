import { getData } from '../api/api.js';
import { renderThumbnails } from './render-thumbnails.js';
import { showMessage } from '../upload-photo/message.js';

export async function initGallery() {
  try {
    const photos = await getData();
    renderThumbnails(photos);
  } catch (error) {
    showMessage({
      type: 'gallery-error',
      onHidden: initGallery
    });
  }
}
