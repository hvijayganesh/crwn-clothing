import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyD4UB9VxzgOmsvmRFRx_tGSH9CSg1EOWIg",
  authDomain: "crwn-db-7686f.firebaseapp.com",
  projectId: "crwn-db-7686f",
  storageBucket: "crwn-db-7686f.appspot.com",
  messagingSenderId: "445259689692",
  appId: "1:445259689692:web:e3bd6f326cdec471004e19",
  measurementId: "G-MT9G88DC7C"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
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
        ...additionalData
      })
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;