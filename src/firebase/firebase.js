import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "testing-56cf8.firebaseapp.com",
  projectId: "testing-56cf8",
  storageBucket: "testing-56cf8.appspot.com",
  messagingSenderId: "702401804801",
  appId: "1:702401804801:web:05aadfc85ad8cd0c285e00",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/////// need auth from this page only////////////
export const auth = getAuth();
///////dp for storing text kind of stuffs
export const db = getFirestore(app);

