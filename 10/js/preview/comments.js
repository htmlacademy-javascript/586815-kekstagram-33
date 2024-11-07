const INITIAL_VISIBLE_COMMENTS = 5;
const COMMENTS_BATCH_SIZE = 5;

const commentsList = document.querySelector('.social__comments');
const templateComment = commentsList.querySelector('.social__comment');
const countNumberComments = document.querySelector('.social__comment-shown-count');
const buttonShowMoreComments = document.querySelector('.comments-loader');

let visibleCommentsCount;
let arrayComments = [];

// Функция рендера комментариев
export const renderComments = (comments, startIndex, endIndex) => {
  const fragment = document.createDocumentFragment();
  const newComments = comments.slice(startIndex, endIndex);
  newComments.forEach((comment) => {
    const newComment = templateComment.cloneNode(true);
    newComment.querySelector('.social__text').textContent = comment.message;
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    fragment.appendChild(newComment);
  });
  commentsList.appendChild(fragment);
};

// Функция для обновления отображаемого количества комментариев
export const updateDisplayedCommentsCount = (count, comments) => {
  countNumberComments.textContent = Math.min(count, comments.length);
};

// Функция для управления видимостью кнопки "Показать еще"
export const toggleLoadMoreButtonVisibility = (comments, count) => {
  if (count >= comments.length) {
    buttonShowMoreComments.classList.add('hidden');
  }
};

// Функция для инициализации первичного показа комментариев
export const initCommentsLoad = (comments) => {
  // Сброс начальных значений и загрузка первой порции комментариев
  arrayComments = comments;
  visibleCommentsCount = INITIAL_VISIBLE_COMMENTS;
  commentsList.innerHTML = '';
  renderComments(comments, 0, visibleCommentsCount);
  updateDisplayedCommentsCount(visibleCommentsCount, comments);
  buttonShowMoreComments.classList.remove('hidden');

  // Проверка и установка видимости кнопки
  toggleLoadMoreButtonVisibility(comments, INITIAL_VISIBLE_COMMENTS);
};

// Функция для инициализации показа комментариев по кнопке "Загрузить ещё"
export const showMoreComments = () => {
  const newEndIndex = visibleCommentsCount + COMMENTS_BATCH_SIZE;
  renderComments(arrayComments, visibleCommentsCount, newEndIndex);
  visibleCommentsCount = newEndIndex;
  toggleLoadMoreButtonVisibility(arrayComments, visibleCommentsCount);
  updateDisplayedCommentsCount(visibleCommentsCount, arrayComments);
};

export const initCommentsLoadMore = () => {
  buttonShowMoreComments.addEventListener('click', showMoreComments);
};
