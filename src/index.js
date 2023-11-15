import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  selectEl: document.querySelector('.breed-select'),
  infoHolder: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
};


refs.selectEl.addEventListener('change', onInputChange);

fetchBreeds()
  .then(res => {
    refs.selectEl.classList.remove('visually-hidden');
    refs.loaderEl.classList.add('visually-hidden');
    refs.errorEl.classList.add('visually-hidden');

    renderSelectInput(res);


    new SlimSelect({
      select: refs.selectEl
    })
  })
  .catch(error => {
    refs.selectEl.classList.add('visually-hidden'),
      refs.infoHolder.classList.add('visually-hidden'),
      refs.loaderEl.classList.add('visually-hidden'),
      refs.errorEl.classList.remove('visually-hidden');
  });


function renderSelectInput(breadsArr) {
  const markup = breadsArr.map(breed => {
    const { id, name } = breed
    return `<option value="${id}">${name}</option>`
  }).join('');
  refs.selectEl.innerHTML = markup;
}

function onInputChange(event) {
  refs.loaderEl.classList.remove('visually-hidden');
  refs.infoHolder.classList.add('visually-hidden');

  fetchCatByBreed(event.target.value)
    .then(res => {
      refs.loaderEl.classList.add('visually-hidden');
      refs.infoHolder.classList.remove('visually-hidden');

      refs.infoHolder.innerHTML = renderCatCard(res);
    })
    .catch(error => {
      refs.selectEl.classList.add('visually-hidden'),
        refs.infoHolder.classList.add('visually-hidden'),
        refs.loaderEl.classList.add('visually-hidden'),
        refs.errorEl.classList.remove('visually-hidden');
      // Notiflix.Notify.failure(refs.errorEl.value);
    });
}

function renderCatCard(catInfo) {
  const { url, breeds } = catInfo[0];

  const { name, description, temperament } = breeds[0];
  return `
    <div class="cat-card-wrapper">
      <img src="${url}" alt="" width='400' height='200'>

      <div>
        <h2>${name}</h2>
        <p>${description}</p>
        <p>${temperament}</p>
      </div>
    </div>

  `
}
