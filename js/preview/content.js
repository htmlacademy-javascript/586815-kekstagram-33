const bigPicture = document.querySelector('.big-picture__img img');
const likes = document.querySelector('.likes-count');
const description = document.querySelector('.social__caption');
const maxNumberComments = document.querySelector('.social__comment-total-count');

export const displayPhotoDetails = (photo) => {
  bigPicture.src = photo.url;
  likes.textContent = photo.likes;
  description.textContent = photo.description;
  maxNumberComments.textContent = photo.comments.length;
};
