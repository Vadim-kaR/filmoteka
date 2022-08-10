import { renderingPaginationMarkup } from './paginationMarkup';
import getTrendingMoviesData from './api/getTrendingMoviesData';
//import { getDataMoviesParams } from './api/getSearchDataMovies';
import getDataMovies from './api/getSearchDataMovies';
import refs from '../constants/refs';
import apiFirebase from './api/firebase';
import MovieLists from './movie-lists';
import currentUser from './storage/currentUser';
import Swiper from '../../node_modules/swiper/swiper-bundle';
import Notiflix from 'notiflix';
import itemsTemplate from '../templates/list-of-card.hbs';
import preloader from '../templates/preloader.hbs';
import generateMoviesWithGenres from './generateMoviesWithGenres';

var swiper = new Swiper('.swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

if (refs.preloaderContainer) {
  refs.preloaderContainer.innerHTML = preloader();
}

async function generateMarkup() {
  localStorage.removeItem('searchData');

  try {
    const moviesData = await getTrendingMoviesData();

    localStorage.setItem('trendingTotalPages', moviesData.total_pages ?? 0);
    renderingPaginationMarkup(1);
    // Creating an object that stores data for handlebars template
    const movieCategories = await generateMoviesWithGenres(moviesData.results);

    // Rendering markup
    setTimeout(() => {
      refs.preloaderContainer.innerHTML = '';
      refs.homeGallery.insertAdjacentHTML(
        'beforeend',
        itemsTemplate(movieCategories)
      );
      refs.footer.style.position = 'static';
    }, 2000);
  } catch (error) {
    console.log('error :>> ', error);
  }
}

async function onSearchSubmit(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget?.elements.searchQuery.value;
  if (searchQuery === '') {
    emptyInput();
  }

  try {
    const moviesData = await getDataMovies(searchQuery);
    const searchData = {
      onSearchTotalPages: moviesData?.total_pages ?? 0,
      onSearchQuery: searchQuery ?? '',
    };

    if (moviesData.total_results === 0) {
      noDataInput();
    } else {
      filmsQuantityInput(moviesData.total_results);
    }

    localStorage.setItem('searchData', JSON.stringify(searchData));
    renderingPaginationMarkup(1);
    const movieCategories = await generateMoviesWithGenres(moviesData.results);
    // Rendering markup

    refs.homeGallery.innerHTML = itemsTemplate(movieCategories);
  } catch (error) {
    console.log('error :>> ', error);
  }
}

function emptyInput() {
  const lang = localStorage.getItem('lang') || '';
  let message = '';
  switch (lang) {
    case 'en':
      message = 'Search query cannot be empty.';
      break;
    case 'ru':
      message = 'Поисковой запрос не может быть пустым';
      break;
    case 'uk':
      message = 'Пошуковий запит не може бути пустим';
      break;
    default:
      console.log('Failed query');
  }

  const error = refs.inputValidationError;

  error.style.color = 'red';
  error.textContent = message;
  error.style.opacity = 1;

  setTimeout(() => {
    error.style.opacity = 0;
  }, 4000);
}

function noDataInput() {
  const lang = localStorage.getItem('lang') || '';
  let message = '';
  switch (lang) {
    case 'en':
      message =
        'Search result is not successful. Enter the correct movie name and try again';
      break;
    case 'ru':
      message =
        'Результат поиска не увенчался успехом. Введите правильное название фильма и повторите попытку';
      break;
    case 'uk':
      message =
        'Результат пошуку не вдалий. Введіть правильну назву фільму та повторіть спробу';
      break;
    default:
      console.log('Failed query');
  }

  const error = refs.inputValidationError;

  error.style.color = 'red';
  error.textContent = message;
  error.style.opacity = 1;

  setTimeout(() => {
    error.style.opacity = 0;
  }, 4000);
}

function filmsQuantityInput(quantity) {
  const lang = localStorage.getItem('lang') || '';
  let message = '';
  switch (lang) {
    case 'en':
      message = `We finded ${quantity} films. Watch with pleasure 😌`;
      break;
    case 'ru':
      message = `Мы нашли ${quantity} фильмов. Смотрите с удовольствием 😌`;
      break;
    case 'uk':
      message = `Ми знайшли ${quantity} фільмів. Дивіться з задоволенням 😌`;
      break;
    default:
      console.log('Failed query');
  }

  const error = refs.inputValidationError;

  error.textContent = message;
  error.style.color = '#ff6b08';
  error.style.opacity = 1;

  setTimeout(() => {
    error.style.opacity = 0;
  }, 4000);
}

// scroll handle to add an endless gallery

if (refs.homeGallery) {
  generateMarkup();
  refs.searchForm.addEventListener('submit', onSearchSubmit);
}

// if user is unauth then my library is unactive
export default function handleMyLibraryClick(e) {
  const lang = localStorage.getItem('lang') || '';
  if (!currentUser.isAuth) {
    e.preventDefault();
    let message = '';
    switch (lang) {
      case 'en':
        message = 'Please, sign in to enter My library';
        break;
      case 'ru':
        message =
          'Пожалуйста, авторизуйтесь, чтобы зайти в раздел Моя библиотека';
        break;
      case 'uk':
        message =
          'Будь ласка, авторизуйтесь, щоб зайти у розділ Моя бібліотека';
        break;
      default:
        console.log('Failed authorization');
    }
    Notiflix.Confirm.show(`${message}`, '', 'Ok', '', '', '', {
      titleMaxLength: 64,
      titleColor: '#111111',
      okButtonBackground: '#ff6b08',
    });
  }
}

refs.myLibraryBtn.addEventListener('click', handleMyLibraryClick);
