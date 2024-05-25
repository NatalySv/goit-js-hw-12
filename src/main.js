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
  loadWrapp: document.querySelector('.wrapper-btn'),
  loadBtn: document.querySelector('.load-btn'),
};

export let querySearch = null;
export const per_page = 15;
export let page = 1;

let heightItem = null;
let numberImgAll = null;
let maxPage = null;

const messageBlank = `Please enter your search query, the field cannot be blank!`;
const messageSorry = `Sorry, there are no images matching your search query. Please try again!`;
const messageEnd = "We're sorry, but you've reached the end of search results.";

refs.form.addEventListener('submit', onSubmit);
refs.loadBtn.addEventListener('click', onClickLoad);

async function onSubmit(event) {
  event.preventDefault();
  page = 1;
  refs.loadBtn.classList.add('is-hidden');
  const inputValue = refs.input.value.trim();

  if (!inputValue) {
    refs.list.innerHTML = '';
    clearPage(messageBlank);
    return;
  }

  querySearch = inputValue;
  refs.list.innerHTML = `<span class="loader"></span>`;
  await getSearch()
    .then(data => {
      if (!data.hits.length) {
        refs.list.innerHTML = '';
        clearPage(messageSorry);
        return;
      }
      refs.list.innerHTML = createMarkup(data.hits);
      lightbox.refresh();
      const itemParams = refs.list.firstChild.getBoundingClientRect();
      heightItem = itemParams.height * 2;
      window.scrollBy({
        top: heightItem,
        behavior: 'smooth',
      });
      page += 1;
      numberImgAll = data.totalHits;
      maxPage = Math.ceil(numberImgAll / per_page);
      if (page <= maxPage) {
        refs.loadBtn.classList.remove('is-hidden');
      }
    })
    .catch(error => {
      getError(error);
    });
  refs.form.reset();
}

async function onClickLoad(event) {
  refs.loadBtn.classList.add('is-hidden');
  refs.loadWrapp.insertAdjacentHTML(
    'beforeend',
    `<span class="loader"></span>`
  );
  await getSearch()
    .then(data => {
      refs.list.insertAdjacentHTML('beforeend', createMarkup(data.hits));
      lightbox.refresh();
      window.scrollBy({
        top: heightItem,
        behavior: 'smooth',
      });
      page += 1;
      refs.loadWrapp.lastChild.remove();
      if (page > maxPage) {
        clearPage(messageEnd);
        return;
      }
      refs.loadBtn.classList.remove('is-hidden');
    })
    .catch(error => {
      refs.loadWrapp.lastChild.remove();
      getError(error);
    });
}

function clearPage(message) {
  refs.loadBtn.classList.add('is-hidden');
  return iziToast.error({
    ...iziOptions,
    message,
    backgroundColor: 'rgb(239, 64, 64)',
    iconUrl: iconError,
  });
}

function getError(error) {
  return iziToast.error({
    ...iziOptionsErr,
    message: `${error}`,
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

const iziOptionsErr = {
  id: 'myIziToast',
  title: 'Error',
  titleColor: 'rgb(255, 255, 255)',
  titleSize: '16',
  messageColor: 'rgb(255, 255, 255)',
  messageSize: '16',
  position: 'topCenter',
};

const lightbox = new SimpleLightbox('.gallery-item a', {
  captionsData: 'alt',
  captionDelay: 250,
});
