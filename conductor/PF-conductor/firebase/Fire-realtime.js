// Get a reference to the database service
import { doc, setDoc, collection, addDoc } from "@firebase/firestore";
import { realdb, db } from "./../apiconfig/firebase-config";
import { ref, set, onValue, onChildChanged, update } from "firebase/database";

const usuariosOnline = ref(realdb, "conductores/");
var usuario = "";

// Write data to Firebase
function writeUserData(latitude, longitude, Placa, Conductor) {
  usuario = Conductor;
  set(ref(realdb, "conductores/" + usuario), {
    latitude: latitude,
    longitude: longitude,
    Placa: Placa,    
  });
}

function updateUserData(latitude, longitude) {
  update(ref(realdb, "conductores/" + usuario), {
    latitude: latitude,
    longitude: longitude,    
  });
}

//Añadir al FireStore
const HistoricUser = async (userId, latitude, longitude, accuracy, date) => {
  try {
    const userDocRef = doc(collection(db, "Historicos"), userId);
    await setDoc(userDocRef, {}); // Crea el documento vacío en la colección "Historicos"
    const historicCollectionRef = collection(userDocRef, "Historic");
    const newHistoricDocRef = await addDoc(historicCollectionRef, {
      Lat: latitude,
      Lon: longitude,
      Accuracy: accuracy,
      Date: date,
    });
    console.log("Document written with ID: ", newHistoricDocRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Read data from Firebase
function readUserData(setMarkers, userId) {  
  onValue(usuariosOnline, (snapshot) => {
    snapshot.forEach((Doc) => {
      console.log(" Data: ", Doc.key, Doc.val().Tag);
    });  
});
}

function getUserData() {
  const markers = [];
  return new Promise((resolve, reject) => {
    const usuariosOnline = ref(realdb, "users/");
    // Registrar un evento 'onValue' con la opción 'onlyOnce' para detener la escucha después de la primera invocación
    onValue(usuariosOnline, (snapshot) => {
      snapshot.forEach((doc) => {           
        const latitude = doc.val().latitude;
        const longitude =  doc.val().longitude;
        const newMarkers = {
          id: doc.key,
          location: { latitude, longitude },
          title: doc.val().Tag,
        };
        markers.push(newMarkers);
      });
      // Llamar a 'resolve' después de procesar los datos
      resolve(markers);
    }, 
    {
      onlyOnce: true, // Opción 'onlyOnce' para detener la escucha después de la primera invocación
      cancelCallback: (error) => {
        // Manejar el error en el callback de error
        reject(error);
      }
    });
    // No es necesario ejecutar el mensaje de error aquí fuera de 'onValue'
  });
}

/* function uploadUserData() {
  return new Promise((resolve, reject) => {    
    onChildChanged(usuariosOnline, (snapshot) => {
      console.log("Este es el Snapshot: ", snapshot);
      console.log("Este es la key: ", snapshot.key);
      const latitude = snapshot.val().latitude;
      const longitude = snapshot.val().longitude;
      const newMarkers = {
        id: snapshot.key,
        location: { latitude, longitude },
        title: snapshot.val().Tag,
      };
      resolve(newMarkers);
    }, (error) => {
      reject("Usuario no encontrado: " + error);
    });
  });
} */


export { writeUserData, readUserData, getUserData, updateUserData, usuariosOnline, HistoricUser };
