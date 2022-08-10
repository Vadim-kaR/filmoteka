export const refsMovieLists = (key) => {
  const refs = {
    addWatchedBtn: document.getElementById('add-watched'),
    addQueueBtn: document.getElementById('add-queue'),
    addListBtnGroup: document.getElementById('js-add-to-list'),
  }
  return key ? refs[key] : refs;
}
export const refsDarkTheme = (key) => {
  const refs = {
    isDarkTheme: document.querySelector('.dark-theme'),
  }
  return key ? refs[key] : refs;
}
export const refsModalFilm = (key) => {
  const refs = {
    btnModalFilm: document.querySelector('.btn-modal-film')
  }
  return key ? refs[key] : refs;
}