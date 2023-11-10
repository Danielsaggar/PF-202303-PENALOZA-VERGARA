// Get a reference to the database service
import { doc, setDoc, collection, addDoc, getDocs } from "@firebase/firestore";
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
      console.log(" Data: ", Doc.key);
    });  
});
}

async function readRutasData() {      
    const collectionRef = collection(db, "rutas");
    //Aquí puedes buscar el documento en Firestore usando el placaId
    const querySnapshot = await getDocs(collectionRef);
    const documents = querySnapshot.docs.map(doc => doc.data());
    console.log("Query: ", documents)  
    return(documents)
}

function getUserData() {
  const markers = [];
  return new Promise((resolve, reject) => {    
    // Registrar un evento 'onValue' con la opción 'onlyOnce' para detener la escucha después de la primera invocación
    onValue(usuariosOnline, (snapshot) => {
      snapshot.forEach((doc) => {                 
        const data = doc.val(); // Obtener los datos del documento

    if (data && data.latitude) {
      // Verificar si data existe y tiene una propiedad 'latitude'
      console.log("Estoy tomando algo:", doc);
      const latitude = data.latitude;
      const longitude = data.longitude;
      const newMarkers = {
        id: doc.key,
        location: { latitude, longitude },
        title: "Conductor",
      };
      markers.push(newMarkers);
    }
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

export { writeUserData, readUserData, getUserData, updateUserData, usuariosOnline, HistoricUser, readRutasData };
