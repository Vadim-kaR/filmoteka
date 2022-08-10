import refs from '../constants/refs';

function onCloseModalRegistrationClick() {
  if (refs.singIn.classList.contains('login-modal__active')) {
    return;
  } else {
    refs.modalRegistration.style.transform = 'translateX(100%)';
    refs.singUp.classList.add('login-modal__noactive');
    refs.singUp.classList.remove('login-modal__active');
    refs.singIn.classList.add('login-modal__active');
    refs.singIn.classList.remove('login-modal__noactive');
  }
}

function onOpenModalRegistrationClick() {
  if (refs.singUp.classList.contains('login-modal__active')) {
    return;
  } else {
    refs.modalRegistration.style.transform = 'translateX(0%)';
    refs.singUp.classList.add('login-modal__active');
    refs.singUp.classList.remove('login-modal__noactive');
    refs.singIn.classList.add('login-modal__noactive');
    refs.singIn.classList.remove('login-modal__active');
  }
}
if (refs.btnSignin) {
  refs.btnSignin.addEventListener('click', onOpenModalLoginClick);
}

function onOpenModalLoginClick() {
  const computeBodyPaddingRight = window.innerWidth - document.body.clientWidth;
  refs.body.style.overflow = 'hidden';
  refs.body.style.paddingRight = `${computeBodyPaddingRight}px`;
  refs.backdropIn.classList.add('modal-in-reg--show');
  onEventListener();
}

export function onCloseModalLoginClick() {
  document.body.style.paddingRight = '0px';
  refs.body.style.overflow = 'visible';
  refs.backdropIn.classList.remove('modal-in-reg--show');
  onCloseModalRegistrationClick();
  ofEventListener();
}

////////////////////////close modal in ESC//////////////////////////////

function closeModalKeydown(event) {
  if (event.code === 'Escape') {
    onCloseModalLoginClick();
  }
}

//////////////////////////////////////////////////////////close modal in backdrop//////////////////////////////////////////////////////////////

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModalLoginClick();
  }
}

////////////////////////remember login and password//////////////////////////////

const localLogin = localStorage.getItem('login') || '';
const localPassword = localStorage.getItem('password') || '';
const localCxheckboxLog = localStorage.getItem('checkboxlog') || '';

if (localLogin !== '') {
  refs.emailLogin.value = localLogin;
}
if (localPassword !== '') {
  refs.passwordLogin.value = localPassword;
}
if (localCxheckboxLog !== '') {
  refs.mobalCheckBox.checked = true;
}

function rememberAndDeletLoginAndPassword() {
  if (refs.mobalCheckBox.checked) {
    localStorage.setItem('checkboxlog', true); // save
    localStorage.setItem('login', emailLogin.value); // save
    localStorage.setItem('password', passwordLogin.value); // save
  } else {
    localStorage.removeItem('login'); // delete
    localStorage.removeItem('password'); // delete
    localStorage.removeItem('checkboxlog'); // delete
  }
}

//formLog.addEventListener('submit', saveLocalStorage);

function saveLocalStorage(e) {
  e.preventDefault();
  rememberAndDeletLoginAndPassword();
}


function onEventListener() {
  refs.singIn.addEventListener('click', onCloseModalRegistrationClick);
  refs.singUp.addEventListener('click', onOpenModalRegistrationClick);
  refs.btnModalClose.addEventListener('click', onCloseModalLoginClick);
  refs.formLog.addEventListener('submit', saveLocalStorage);
  window.addEventListener('keydown', closeModalKeydown);
  refs.backdropIn.addEventListener('click', onBackdropClick);
}

function ofEventListener() {
  refs.singIn.removeEventListener('click', onOpenModalLoginClick);
  refs.singUp.removeEventListener('click', onOpenModalRegistrationClick);
  refs.btnModalClose.removeEventListener('click', onCloseModalLoginClick);
  refs.formLog.removeEventListener('submit', saveLocalStorage);
  window.removeEventListener('keydown', closeModalKeydown);
  refs.backdropIn.removeEventListener('click', onBackdropClick);
}
