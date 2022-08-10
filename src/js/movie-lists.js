import firebaseWriteDb from "./api/firebase/firebase_write_db";
import { refsMovieLists } from "../constants/dynamicRefs";
import currentUser from './storage/currentUser';
import localizeString from "./utils/localizeString";
// import onAddRemoveBntClick from './library-draw';

const buttonStates = {
  addWatchedBtn: {
    inWatched: {
      watched: true,
      text: 'Remove from watched',
      lngKey: 'addWatchedBtn_watched',
      action: firebaseWriteDb.removeFromWatched,
    },
    default: {
      default: true,
      text: 'Add to watched',
      lngKey: 'addWatchedBtn',
      action: firebaseWriteDb.addToWatched
    },
  },
  addQueueBtn: {
    inQueue: {
      queued: true,
      text: 'Remove from queue',
      lngKey: 'addQueueBtn_queue',
      action: firebaseWriteDb.removeFromQueue

    },
    default: {
      default: true,
      text: 'Add to queue',
      lngKey: 'addQueueBtn',
      action: firebaseWriteDb.addToQueue
    }
  }
}

const ModalMovie = (function () {
  let addWatchedBtnState = buttonStates.addWatchedBtn.default;
  let addQueueBtnState = buttonStates.addQueueBtn.default;
  let movieId = null;
  const checkIfMovieIsInList = (movieId, list) => list?.includes(parseInt(movieId));

  function init() {
    movieId = refsMovieLists('addListBtnGroup').dataset?.id;

    const movieInQueueList = checkIfMovieIsInList(movieId, currentUser.movieLists?.queue)
    const movieInWatchedList = checkIfMovieIsInList(movieId, currentUser.movieLists?.watched)

    addQueueBtnState = movieInQueueList ? buttonStates.addQueueBtn.inQueue : buttonStates.addQueueBtn.default;
    addWatchedBtnState = movieInWatchedList ? buttonStates.addWatchedBtn.inWatched : buttonStates.addWatchedBtn.default;
    return ModalMovie;
  }
  function listBtnHandler(e) {
    if (e.target.nodeName !== "BUTTON") return;
    if (e.target.id === 'add-queue') {
      addQueueBtnState.action(movieId);
      addQueueBtnState = addQueueBtnState.default ? buttonStates.addQueueBtn.inQueue : buttonStates.addQueueBtn.default;
    }
    if (e.target.id === 'add-watched') {
      addWatchedBtnState.action(movieId);
      if (addWatchedBtnState.default) {
        addWatchedBtnState = buttonStates.addWatchedBtn.inWatched;
        addQueueBtnState = buttonStates.addQueueBtn.default;
      } else {
        addWatchedBtnState = buttonStates.addWatchedBtn.default;
      }
    }
    ModalMovie
      .render()
      .setupEvents();

  }
  function render() {
    if (!currentUser.isAuth) {
      refsMovieLists('addListBtnGroup').innerHTML = '';
      return ModalMovie;
    }
    refsMovieLists('addWatchedBtn').dataset.active = addWatchedBtnState.default ? 'false' : 'true';
    refsMovieLists('addWatchedBtn').textContent = localizeString(addWatchedBtnState.lngKey);
    refsMovieLists('addQueueBtn').dataset.active = addQueueBtnState.default ? 'false' : 'true';
    refsMovieLists('addQueueBtn').textContent = localizeString(addQueueBtnState.lngKey);

    return ModalMovie
  }

  function setupEvents() {
    let button =
      refsMovieLists().addListBtnGroup
        .addEventListener("click", ModalMovie.listBtnHandler)
  }

  document.addEventListener('modal-film-opened', (e) => {
    ModalMovie
      .init()
      .render()
      .setupEvents();
  });

  return { init, render, listBtnHandler, setupEvents }

})();