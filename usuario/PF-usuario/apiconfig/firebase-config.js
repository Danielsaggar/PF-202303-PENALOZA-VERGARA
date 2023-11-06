import firebase, { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQKXbJN9BSYqtf1Fu9gZxHDNPkHP_857k",
  authDomain: "pf-2023-aleja-yesid.firebaseapp.com",
  databaseURL: "https://pf-2023-aleja-yesid-default-rtdb.firebaseio.com/",
  projectId: "pf-2023-aleja-yesid",
  storageBucket: "pf-2023-aleja-yesid.appspot.com",
  messagingSenderId: "539143780591",
  appId: "1:539143780591:web:26d172e6445cbc5974431a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const realdb = getDatabase(app);

export { auth, db, realdb };
