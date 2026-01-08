import { getData } from '../api/api.js';
import { renderThumbnails } from './render-thumbnails.js';
import { showMessage } from '../upload-photo/message.js';
import { initFilters } from './filters.js';

export async function initGallery() {
  try {
    const photos = await getData();
    renderThumbnails(photos);
    initFilters(photos, renderThumbnails);
  } catch (error) {
    showMessage({
      type: 'gallery-error',
      title: `Ошибка: ${error.message}. Не удалось загрузить фотографии`,
      onPrimaryAction: initGallery,
    });
  }
}
