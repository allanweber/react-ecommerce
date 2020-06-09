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
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
export const createUSerProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user -> " + error);
    }
  } else {
    console.log("User Already Exists");
  }
  return userRef;
};

export const addCollectionsAndItems = async (collectionKey, objectsToAdd) => {
  console.log(objectsToAdd);
  const collectionRef = firestore.collection(collectionKey);
  console.log(objectsToAdd);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};
