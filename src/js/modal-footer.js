import refs from '../constants/refs';

function onOpenModal() {
  window.addEventListener('keydown', onEscKeydown);
  refs.backdropFooter.style.display = 'flex';
  refs.body.style.overflow = 'hidden';
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeydown);
  refs.backdropFooter.style.display = 'none';
  refs.body.style.overflow = 'visible';
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
    refs.body.style.overflow = 'visible';
  }
}

function onEscKeydown(e) {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    onCloseModal();
    refs.body.style.overflow = 'visible';
  }
}

refs.openModal.addEventListener('click', onOpenModal);
refs.closeModal.addEventListener('click', onCloseModal);
refs.backdropFooter.addEventListener('click', onBackdropClick);
