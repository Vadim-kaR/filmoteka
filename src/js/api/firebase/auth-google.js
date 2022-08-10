import auth from './auth_firebase';
import refs from '../../../constants/refs';

refs.googleIn.addEventListener('click', auth.logInByGoogle);
refs.googleOut.addEventListener('click', auth.logOut);
