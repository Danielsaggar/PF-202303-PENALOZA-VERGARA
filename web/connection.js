const admin = require("firebase-admin");
require('dotenv').config();

const serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_URL
});

const auth = admin.auth();
const db = admin.firestore();
const realdb = admin.database();


module.exports = { auth, db, realdb };