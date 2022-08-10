import getSearchDataMovies from './api/getSearchDataMovies';
import getTrendingMoviesData from './api/getTrendingMoviesData';
import generateMoviesWithGenres from './generateMoviesWithGenres';
import itemsTemplate from '../templates/list-of-card.hbs';
import preloader from '../templates/preloader.hbs';
import { renderingPaginationMarkup } from './paginationMarkup';
import refs from '../constants/refs';

let currentPage = 1;

let maxPage = localStorage.getItem('searchData')
  ? Number(localStorage.getItem('onSearchTotalPages'))
  : Number(localStorage.getItem('trendingTotalPages'));
/////////////////////////////////////////////////////////

async function renderingFilmsMarkup(currentPage) {
  renderingPaginationMarkup(currentPage);
  let data = JSON.parse(localStorage.getItem('searchData'))?.onSearchQuery
    ? await getSearchDataMovies(
        JSON.parse(localStorage.getItem('searchData')).onSearchQuery,
        currentPage
      )
    : await getTrendingMoviesData(currentPage);
  const movieCategories = await generateMoviesWithGenres(data.results);

  // Rendering markup
  setTimeout(() => {
    refs.preloaderContainer.innerHTML = '';
    refs.gallery.innerHTML = itemsTemplate(movieCategories);
    refs.footer.style.position = 'static';
  }, 2000);
}

async function onPaginationBtnClick(event) {
  refs.footer.style.position = 'fixed';
  refs.preloaderContainer.innerHTML = preloader();
  refs.gallery.innerHTML = '';
  if (event.target.nodeName !== 'SPAN') {
    return;
  }
  if (event.target.dataset.span === 'prev') {
    currentPage -= 1;
    renderingFilmsMarkup(currentPage);
    return;
  }
  if (event.target.dataset.span === 'next') {
    currentPage += 1;
    renderingFilmsMarkup(currentPage);
    return;
  }
  if (event.target.dataset.value === 'dots') {
    if (Number(event.target.nextElementSibling?.dataset?.value) === maxPage) {
      currentPage += 1;
      renderingFilmsMarkup(currentPage);
      return;
    } else {
      currentPage -= 1;
      renderingFilmsMarkup(currentPage);
      return;
    }
  }
  currentPage = Number(event.target.textContent);
  renderingFilmsMarkup(currentPage);
}

if (refs.paginationList) {
  refs.paginationList.addEventListener('click', onPaginationBtnClick);
}
