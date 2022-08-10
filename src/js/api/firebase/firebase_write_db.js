import currentUser from '../../storage/currentUser';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import {
    setDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    doc,
    onSnapshot,
} from 'firebase/firestore';
import { db } from './firebase_app';

onAuthStateChanged(getAuth(), user => {
    if (user) {
        onSnapshot(doc(db, 'users', user.uid), doc => {
            currentUser.movieLists = doc.data();
        });
    } else {
        currentUser.clear();
    }
});

const updateUserMovies = async ({ movieId, movieList }) => {
    try {
        await setDoc(doc(db, "users", currentUser.userUiid), {
            [movieList]: arrayUnion(parseInt(movieId))
        }, { merge: true });
    } catch (e) {
        throw Error(`Error adding to ${movieList}:`, e);
    }
}
const removeFromList = async (movieId, movieList) => {
    try {
        await updateDoc(doc(db, "users", currentUser.userUiid), {
            [movieList]: arrayRemove(parseInt(movieId))
        })
    } catch (e) {
        throw Error(`Error removing from ${movieList}:`, e);
    }
}
const removeFromQueue = async (movieId) => {
    removeFromList(movieId, "queue");
}
const removeFromWatched = async (movieId) => {
    removeFromList(movieId, "watched");
}
const addToQueue = async (movieId) => {
    await updateUserMovies({ movieId, movieList: "queue" });
}
const addToWatched = async (movieId) => {
    await updateUserMovies({ movieId, movieList: "watched" });
    removeFromQueue(movieId);
}

export default { removeFromQueue, removeFromWatched, addToQueue, addToWatched };
