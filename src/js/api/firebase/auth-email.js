import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from './firebase_app';
import currentUser from '../../storage/currentUser';
import { onCloseModalLoginClick } from '../../singIn.js';
import Notiflix from 'notiflix';
import localizeString from '../../utils/localizeString';
import refs from '../../../constants/refs';

if (refs.signUpForm) {
  refs.signUpForm.password.onchange = validatePassword;
  refs.signUpForm.confirmPassword.onkeyup = validatePassword;
  function validatePassword() {
    if (refs.signUpForm.password.value != refs.signUpForm.confirmPassword.value) {
      refs.signUpForm.confirmPassword.setCustomValidity("Passwords Don't Match");
    } else {
      refs.signUpForm.confirmPassword.setCustomValidity('');
    }
  }

  refs.signUpForm.addEventListener('submit', e => {
    e.preventDefault();
    const displayName = refs.signUpForm.name.value;
    const email = refs.signUpForm.email.value;
    const password = refs.signUpForm.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        Notiflix.Notify.success(localizeString('signUpSuccess'));
        const user = userCredential.user;
        updateProfile(user, { displayName });
        currentUser.isAuth = true;
        currentUser.userEmail = user.email;
        currentUser.userUiid = user.uid;
        currentUser.userName = user.displayName;
        onCloseModalLoginClick();
        // ...
      })
      .catch(error => {
        console.log(error.code);
        Notiflix.Notify.failure(localizeString(error.code));
      });
  });
  refs.signInForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = refs.signInForm.email.value;
    const password = refs.signInForm.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        currentUser.isAuth = true;
        currentUser.userEmail = user.email;
        currentUser.userUiid = user.uid;
        currentUser.userName = user.displayName;
        onCloseModalLoginClick();
      })
      .catch(error => {
        Notiflix.Notify.failure(localizeString(error.code));
      });
  });
}
