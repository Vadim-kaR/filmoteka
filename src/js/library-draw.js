import constants from '../constants/constants';
import itemsTemplate from '../templates/list-of-card-library.hbs';
import getUsersMovieList from '../js/api/firebase/firebase_read_db';
import auth from './api/firebase/auth_firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import currentUser from './storage/currentUser';
import refs from '../constants/refs';

const axios = require('axios').default;
const MOVIE_URL = `https://api.themoviedb.org/3/movie/`;

refs.btnWatched.addEventListener('click', onLibraryBtnClick); // Set the listener on Watch button
refs.btnQueue.addEventListener('click', onLibraryBtnClick); // Set the listener on Queque button

refs.btnSignOut.addEventListener('click', auth.logOut);

let pageOfList = 1; // package number
let marker = false; // a marker of whether the received packet is drawn
let typeOfList = 'btn-queue'; // initial value of page type (Queue)
let listofMovie; // global var for scrolling

// -------------------------- drawing initial page
const authent = getAuth();
onAuthStateChanged(authent, user => {
  if (user) {
    getUsersMovieList(typeOfList).then(generateLibraryMarkup);
    refs.googleUserLibrary.textContent = currentUser.userEmail;
  } else {
  }
});

// -------------------------- handle button click
async function onLibraryBtnClick(event) {
  typeOfList = event.target.id; // pull target info about type of list
  readyToNew(typeOfList); // clear old data
  await getUsersMovieList(typeOfList, event).then(generateLibraryMarkup); // drawing initial selected page
}

async function onAddRemoveBntClick() {
  refs.galleryLibrary.innerHTML = ''; // clear content
  await getUsersMovieList(typeOfList).then(generateLibraryMarkup); // drawing initial selected page
}

// -------------------------- preparation before drawing
function readyToNew(typeOfList) {
  btnChangeColor(typeOfList); // clear field
  refs.galleryLibrary.innerHTML = ''; // clear content
  pageOfList = 1; // return to the initial value of the packet (=1)
}

// -------------------------- generate the markup
async function generateLibraryMarkup(usersList) {
  const moviesPerPage = 12;                                                                   // cards per fetch
  listofMovie = usersList;                                                                    // set global value for scrolling                                                                     // current page for markup
  let startItemPosition = (pageOfList - 1) * moviesPerPage;                                   // first item in list for murkup
  let onePageList = usersList.slice(startItemPosition, startItemPosition + moviesPerPage);    // get list of movie's id for current fetch
  onePageList = await makeArreyOfDataMovies(onePageList);                                     // making array of the movie objects = movies id list 
  refs.galleryLibrary.insertAdjacentHTML('beforeend', itemsTemplate(onePageList));                 // drawinf gallery
  document.body.style.cursor = 'default';                                                     // 
  marker = true;
  // if (onePageList.length > 0) { refs.footer.style.position = "static" };
}

// -------------------------- making movies data object array
async function makeArreyOfDataMovies(array) {
  document.body.style.cursor = 'wait';
  const arr = await Promise.all(
    array.map(async el => {
      el = await axios.get(`${MOVIE_URL}${el}`, {
        params: { api_key: constants.API_KEY, language: 'ru-RU' },
      }); // fetch data by movie id
      el = el.data;
      el.name = el.title.toUpperCase(); // ajust data for the template
      el.release = el.release_date?.slice(0, 4) || 2022;
      el.genres = el.genres.map(item => (item = item.name)); // convert genres data object to genres array
      return el;
    })
  );
  return Promise.resolve(arr);
}

// --------------------------- btn Change Color
function btnChangeColor(ev) {
  if (ev === 'btn-watched' && !refs.btnWatched.classList.contains('active-btn')) {
    refs.btnWatched.classList.toggle('active-btn');
    refs.btnQueue.classList.toggle('active-btn');
    return;
  }

  if (ev === 'btn-queue' && !refs.btnQueue.classList.contains('active-btn')) {
    refs.btnQueue.classList.toggle('active-btn');
    refs.btnWatched.classList.toggle('active-btn');
    return;
  }
}

// scroll handle to add an endless gallery
window.addEventListener('scroll', () => {
  const docRect = document.documentElement.getBoundingClientRect(); // gain access to the screen area
  if (
    docRect.bottom < document.documentElement.clientHeight + 150 &&
    marker &&
    listofMovie.length / 12 >= pageOfList
  ) {
    // if the scroll reached 150 from below and the token allows (to avoid duplication of requests), then we process the request
    marker = false;
    pageOfList++; // increase the packet number by 1
    generateLibraryMarkup(listofMovie);
  }

  if (window.pageYOffset > 70) {
    // on / off button up
    refs.upBtn.classList.add('on-screen');
  } else {
    refs.upBtn.classList.remove('on-screen');
  }
});

export default onAddRemoveBntClick;
