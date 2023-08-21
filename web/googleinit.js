require('dotenv').config();
const serviceAccount = require("./key.json");
// Import the functions you need from the SDKs you need
const { initializeApp }= require("firebase/app") ;
const { getAuth } = require ("firebase/auth");
const { getFirestore }  = require ("firebase/firestore");
const { getDatabase }  = require ("firebase/database");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {  
  apiKey: process.env.API_KEY,
  authDomain: process.env.DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const realdb = getDatabase(app);

module.exports = { auth, db, realdb };