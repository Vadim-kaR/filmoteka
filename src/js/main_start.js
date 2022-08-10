import refs from '../constants/refs';

if (!refs.main) {
  return;
}

const mainStart = sessionStorage.getItem('main-display') || '';

if (mainStart !== '') {
  refs.main.style.display = 'none';
  refs.bodyStartImg.style.overflow = 'visible';
}

refs.superButton.addEventListener('click', () => {
  refs.bottomImg.classList.add('active');
  refs.lineright.classList.add('active');
  refs.main.classList.add('active');
  refs.half.classList.add('active');
  refs.overlay.classList.add('active');
  refs.buttonLine.classList.add('active');
  refs.superButton.classList.add('active');
  sessionStorage.setItem('main-display', 'none');
  setTimeout(() => {
    refs.bodyStartImg.style.overflow = 'visible';
    refs.main.style.display = 'none';
  }, 2500);
});
