import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import axios from 'axios';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_NqFkZFiU9gyob8GubmTSncsKzDekwNgPBgOQgrn0qboaNt8sORlowmRODbnyLm81';

document.addEventListener('DOMContentLoaded', () => {
  fetchBreeds()
    .then(breeds => {
      const select = document.querySelector('.breed-select');

      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        select.appendChild(option);
      });

      new SlimSelect({ select: '.breed-select' });

      select.addEventListener('change', event => {
        const selectedBreedId = event.target.value;
        fetchCatByBreed(selectedBreedId)
          .then(cat => {
            const catInfoDiv = document.querySelector('.cat-info');
            catInfoDiv.innerHTML = '';

            const catImage = document.createElement('img');
            catImage.src = cat.url;

            const catName = document.createElement('h2');
            catName.textContent = `Breed: ${cat.breeds[0].name}`;

            const catDescription = document.createElement('p');
            catDescription.textContent = `Description: ${cat.breeds[0].description}`;

            const catTemperament = document.createElement('p');
            catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;

            catInfoDiv.appendChild(catImage);
            catInfoDiv.appendChild(catName);
            catInfoDiv.appendChild(catDescription);
            catInfoDiv.appendChild(catTemperament);
          })
          .catch(error => {
            console.error('fetchCatByBreed error:', error);
            Notiflix.Notify.failure(
              'Oops! Something went wrong! Try reloading the page!'
            );
          });
      });
    })
    .catch(error => {
      console.error('fetchBreeds error:', error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
});
