import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAQGg3dhKyeXtmXXJ8oPSN9axbjiqGeedg",
  authDomain: "ecommerce-db-allan.firebaseapp.com",
  databaseURL: "https://ecommerce-db-allan.firebaseio.com",
  projectId: "ecommerce-db-allan",
  storageBucket: "ecommerce-db-allan.appspot.com",
  messagingSenderId: "422265285948",
  appId: "1:422265285948:web:ebe9f79a915f9fa7b68239",
  measurementId: "G-MMFE1RXQFQ",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
