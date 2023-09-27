import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import axios from 'axios';

// Ustawiamy nagłówek 'x-api-key' dla wszystkich żądań Axios na określoną wartość klucza API.
axios.defaults.headers.common['x-api-key'] =
  'live_NqFkZFiU9gyob8GubmTSncsKzDekwNgPBgOQgrn0qboaNt8sORlowmRODbnyLm81';

function fetchBreeds() {
  // Wysyłamy zapytanie GET do API The Cat API w celu pobrania listy ras kotów.
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      // Jeśli zapytanie jest udane, wyświetlamy informację o sukcesie w konsoli.
      console.log('OK', response.data);

      // Zwracamy dane o rasach kotów jako wynik sukcesu.
      return response.data;
    })
    .catch(error => {
      // Jeśli wystąpił błąd podczas wykonywania zapytania, wyświetlamy informację o błędzie w konsoli.
      console.log('fetchBreeds error', error.response);

      // Wyświetlamy użytkownikowi powiadomienie o błędzie za pomocą Notiflix.
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );

      // Rzucamy błąd, aby możliwe było dalsze zarządzanie błędami w kodzie wywołującym tę funkcję.
      throw error;
    });
}

function fetchCatByBreed(breedId) {
  // Wyświetlamy informację o rozpoczęciu pobierania informacji o kocie dla danej rasy.
  console.log('displayCatInfo', breedId);
  console.log(`Fetching cat for breed: ${breedId}`);

  // Wysyłamy zapytanie GET do API The Cat API w celu pobrania informacji o kocie dla konkretnej rasy.
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0]) // Zwracamy pierwszy obiekt z odpowiedzi jako wynik sukcesu.
    .catch(error => {
      // Jeśli wystąpił błąd podczas wykonywania zapytania, wyświetlamy informację o błędzie w konsoli.
      console.log('fetchCatByBreed error', error.response);

      // Wyświetlamy użytkownikowi powiadomienie o błędzie za pomocą Notiflix.
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );

      // Rzucamy błąd, aby możliwe było dalsze zarządzanie błędami w kodzie wywołującym tę funkcję.
      throw error;
    });
}

export { fetchBreeds, fetchCatByBreed };
