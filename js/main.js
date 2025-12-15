import { renderThumbnails } from './modules/gallery/render-thumbnails.js';
import { createPhotosList } from './modules/data/data.js';
import { initUploadForm } from './modules/upload-photo/upload-form.js';

const photos = createPhotosList();
renderThumbnails(photos);
initUploadForm();
