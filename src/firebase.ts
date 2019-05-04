import * as firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: "AIzaSyChJiKzP2WHa3PeORhDogOEE9HxPaq6eAk",
  authDomain: "bill-tracker-37886.firebaseapp.com",
  databaseURL: "https://bill-tracker-37886.firebaseio.com",
  projectId: "bill-tracker-37886",
  storageBucket: "bill-tracker-37886.appspot.com",
  messagingSenderId: "939604717473",
  appId: "1:939604717473:web:2400de8b2e5240d3"
});

const provider = new firebase.auth.GoogleAuthProvider();

export const auth = firebase.auth();
export const logIn = () => auth.signInWithPopup(provider);
export const logOut = () => auth.signOut();
export const onUserChange = (cb: any) => auth.onAuthStateChanged(cb);
