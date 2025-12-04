import { renderThumbnails } from './modules/render-thumbnails.js';
import { createPhotosList } from './modules/data.js';

const photos = createPhotosList();
renderThumbnails(photos);
