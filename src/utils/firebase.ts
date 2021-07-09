import firebase from "firebase/app";
import "firebase/firestore";
// import "firebase/auth";
// import "firebase/analytics";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDNNoQeKb9ZyzwHk8VVIccFJbD-coQl0pw",
    authDomain: "focus-26a80.firebaseapp.com",
    projectId: "focus-26a80",
    storageBucket: "focus-26a80.appspot.com",
    messagingSenderId: "243269461163",
    appId: "1:243269461163:web:0aaeea7bdbabba56fc83ee",
  });
  //   firebase.analytics();
}

export const db = firebase.firestore();

// export const auth = firebase.auth();
export default firebase;

// Setting up google auth provider
// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });
// export const signInWithGoogle = () => auth.signInWithPopup(provider);
