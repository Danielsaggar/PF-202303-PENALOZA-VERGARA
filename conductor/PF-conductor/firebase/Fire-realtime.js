// Get a reference to the database service
import { doc, setDoc, collection, addDoc, getDocs } from "@firebase/firestore";
import { realdb, db } from "./../apiconfig/firebase-config";
import { ref, set, onValue, onChildChanged, update } from "firebase/database";

const usuariosOnline = ref(realdb, "conductores/");
var usuario = "";

// Write data to Firebase
async function writeUserData(latitude, longitude, Placa, Conductor) {
  usuario = Conductor;
  const ubicacionRef = ref(realdb, "conductores/" + usuario);
  
// Verificar si la ubicación ya existe en la base de datos
    if (ubicacionRef) {
    // La ubicación ya existe, puedes actualizar los datos o hacer lo que necesites.
    // Por ejemplo, podrías realizar un update en lugar de un set.
    update(ubicacionRef, {
      latitude: latitude,
      longitude: longitude,
      Placa: Placa,
    });
  } else {
    // La ubicación no existe, puedes crearla utilizando set.
    set(ubicacionRef, {
      latitude: latitude,
      longitude: longitude,
      Placa: Placa,
    });
  }
}


function updateUserData(latitude, longitude) {
  update(ref(realdb, "conductores/" + usuario), {
    latitude: latitude,
    longitude: longitude,    
  });
}

//Añadir al FireStore
const HistoricUser = async (latitude, longitude, accuracy, date) => {
  try {
    const userDocRef = doc(collection(db, "Historicos"), usuario);
    await setDoc(userDocRef, {}); // Crea el documento vacío en la colección "Historicos"
    const historicCollectionRef = collection(userDocRef, "Historic");
    const newHistoricDocRef = await addDoc(historicCollectionRef, {
      Lat: latitude,
      Lon: longitude,
      Accuracy: accuracy,
      Date: date,
    });
    // console.log("Document written with ID: ", newHistoricDocRef.id);
  } catch (e) {
    // console.error("Error adding document: ", e);
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

async function readRutasData(Conductor) {      
    usuario = Conductor;
    const ConductorOnline = ref(realdb, "conductores/" + usuario);
    const rutas = [];
    // Registrar un evento 'onValue' con la opción 'onlyOnce' para detener la escucha después de la primera invocación
    const obtenerRutas = new Promise((resolve, reject) => {
      onValue(
        ConductorOnline,
        (snapshot) => {
          const data = snapshot.val();
  
          if (data && data.Rutas) {
            // Si hay datos y existe la propiedad Rutas
            const rutasConductor = data.Rutas;
  
            // Recorrer cada ruta y hacer push al array rutas
            rutasConductor.forEach((ruta) => {
              rutas.push(ruta.Ruta);
            });
          }
  
          // Cuando hayas completado tu lógica, resuelve la promesa con el array de rutas
          resolve(rutas);
        },
        {
          onlyOnce: true,
          cancelCallback: (error) => {
            // Manejar el error en el callback de error
            reject(error);
          },
        }
      );
    });
    
    // Luego, puedes usar la promesa para obtener el mapa
    obtenerRutas
      .then(() => {
        // Aquí puedes usar el mapa
        // console.log("Realtime: ",rutas);
        // return(map)
      })
      .catch((error) => {
        // Manejar errores
        console.error(error);
      });

    const collectionRef = collection(db, "rutas");
    //Aquí puedes buscar el documento en Firestore usando el placaId
    const querySnapshot = await getDocs(collectionRef);
    const documents = querySnapshot.docs.map(doc => doc.data());    
    // console.log("Metodo tradicional", documents)
    return(rutas)
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


export { writeUserData, readUserData, getUserData, updateUserData, usuariosOnline, HistoricUser, readRutasData };
