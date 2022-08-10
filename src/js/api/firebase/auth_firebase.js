import { auth, provider } from './firebase_app';
import { onAuthStateChanged, signInWithRedirect, signOut } from 'firebase/auth';
import currentUser from '../../storage/currentUser';
import refs from '../../../constants/refs';

onAuthStateChanged(auth, user => {
    if (user) {
        currentUser.userName = user.displayName;
        currentUser.userEmail = user.email;
        currentUser.userUiid = user.uid;
        currentUser.isAuth = true;
        try {
            if (!refs.btnSignin.classList.contains('auth-hide')) { refs.btnSignin.classList.toggle('auth-hide') };
            if (refs.googleOut.classList.contains('auth-hide')) { refs.googleOut.classList.toggle('auth-hide') };
            if (refs.googleUser.classList.contains('auth-hide')) { refs.googleUser.classList.toggle('auth-hide') };
            googleUser.textContent = currentUser.userEmail;
            myLibraryBtn.classList.remove('unactive');
        } catch (error) { }
    } else {
        currentUser.clear();
    }
});

function logInByGoogle() {
  console.log('login API');
  signInWithRedirect(auth, provider);
  // return getRedirectResult(auth);
}

function logOut() {
    signOut(auth)
        .then(() => {
            refs.btnSignin.classList.toggle('auth-hide');
            refs.googleOut.classList.toggle('auth-hide');
            refs.googleUser.classList.toggle('auth-hide');
        })
        .catch(error => {
            console.log('Sign-out error', error);
        });
}

export default { logInByGoogle, logOut };
