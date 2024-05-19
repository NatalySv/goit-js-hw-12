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
};

export let querySearch = null;

refs.form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const inputValue = refs.input.value;

  if (!inputValue) {
    refs.list.innerHTML = '';
    iziToast.error({
      ...iziOptions,
      message: `Please enter your search query, the field cannot be blank!`,
      backgroundColor: 'rgb(239, 64, 64)',
      iconUrl: iconError,
    });
    return;
  }

  querySearch = inputValue;
  refs.list.innerHTML = `<span class="loader"></span>`;
  getSearch()
    .then(data => {
      if (!data.hits.length) {
        refs.list.innerHTML = '';
        iziToast.error({
          ...iziOptions,
          message: `Sorry, there are no images matching your search query. Please try again!`,
          backgroundColor: 'rgb(239, 64, 64)',
          iconUrl: iconError,
        });
        return;
      }
      refs.list.innerHTML = createMarkup(data.hits);
      lightbox.refresh();
    })
    .catch(error => console.log('catch', error));
  refs.form.reset();
}

const iziOptions = {
  id: 'myIziToast',
  title: 'Error',
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
