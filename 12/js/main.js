import { initUploadForm } from './modules/upload-photo/upload-form.js';
import { initGallery } from './modules/gallery/gallery-init.js';

document.addEventListener('DOMContentLoaded', () => {
  initUploadForm();
  initGallery();
});
