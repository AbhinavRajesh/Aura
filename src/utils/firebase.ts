import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDNNoQeKb9ZyzwHk8VVIccFJbD-coQl0pw",
    authDomain: "focus-26a80.firebaseapp.com",
    projectId: "focus-26a80",
    storageBucket: "focus-26a80.appspot.com",
    messagingSenderId: "243269461163",
    appId: "1:243269461163:web:0aaeea7bdbabba56fc83ee",
    measurementId: "G-715TT0HGV0",
  });
  firebase.analytics();
}

export const db = firebase.firestore();
export default firebase;
