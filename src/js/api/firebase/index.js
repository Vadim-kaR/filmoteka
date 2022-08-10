import auth from './auth_firebase';
import add from './firebase_write_db';

import get from './firebase_read_db';
import './auth-email';

// export default { logInByGoogle, logOut, addDocument, getDocument, removeFromQueue, addToQueue, addToWatched, getUsersMovieList };
export default { auth, add, get };
