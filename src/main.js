import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from './img/icon-error.svg';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getSearch } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';

export const refs = {
  form: document.querySelector('.task-form'),
  input: document.querySelector('.form-input'),
  list: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-btn'),
};

export let querySearch = null;
export const per_page = 15;
export let page = 1;
export const maxPage = Math.ceil(200 / per_page);

const messageBlank = `Please enter your search query, the field cannot be blank!`;
const messageSorry = `Sorry, there are no images matching your search query. Please try again!`;

refs.form.addEventListener('submit', onSubmit);
// refs.loadBtn.addEventListener('click', onClickLoad);

async function onSubmit(event) {
  event.preventDefault();
  page = 1;
  const inputValue = refs.input.value;

  if (!inputValue) {
    refs.list.innerHTML = '';
    warningMessage(messageBlank);
    return;
  }

  querySearch = inputValue;
  refs.list.innerHTML = `<span class="loader"></span>`;
  await getSearch()
    .then(data => {
      if (!data.hits.length) {
        refs.list.innerHTML = '';
        warningMessage(messageSorry);
        return;
      }
      refs.list.innerHTML = createMarkup(data.hits);
      lightbox.refresh();
    })
    .catch(error => console.log('catch', error));
  refs.form.reset();
}

function warningMessage(message) {
  return iziToast.error({
    ...iziOptions,
    message,
    backgroundColor: 'rgb(239, 64, 64)',
    iconUrl: iconError,
  });
}

const iziOptions = {
  id: 'myIziToast',
  title: 'Warning',
  titleColor: 'rgb(255, 255, 255)',
  titleSize: '16',
  messageColor: 'rgb(255, 255, 255)',
  messageSize: '16',
  position: 'topRight',
};

const lightbox = new SimpleLightbox('.gallery-item a', {
  captionsData: 'alt',
  captionDelay: 250,
});
