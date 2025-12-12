function updateBigPictureUI(bigPictureElements, photo) {
  bigPictureElements.bigPictureImage.src = photo.url;
  bigPictureElements.bigPictureImage.alt = photo.description || '';
  bigPictureElements.socialCaption.textContent = photo.description || '';
  bigPictureElements.likesCount.textContent = photo.likes;
  bigPictureElements.commentsCount.textContent = photo.comments.length;
}

export { updateBigPictureUI };
