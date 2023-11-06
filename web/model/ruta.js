const { db } = require("../connection")
const { realdb } = require ("./../googleinit");
const { ref, set, onValue, onChildChanged, update } = require ("firebase/database");

// Crear un nuevo documento en una colección
async function new_ruta(data) {                        
        const userDocRef = db.collection('rutas');               
        userDocRef.add(data)
        .then((docRef) => {
            console.log('Documento agregado con ID:', docRef.id);
            console.log('Documento creado exitosamente');            
            docRef.update({Id: docRef.id})
            console.log("Data:", data)            
        })
        .catch((error) => {
            console.error('Error al crear el documento:', error);
        });              
}

// Leer cosas
async function read_point() {                        
  const userDocRef = db.collection('rutas');                 
  userDocRef.get()
  .then((docRef) => {
      console.log('docRef:', docRef);
      console.log('Leido exitosamente');                        
  })
  .catch((error) => {
      console.error('Error al leer el documento:', error);
  });              
}

// Crear un nuevo documento en realtime
function real_placa(placa, id) {
    set(ref(realdb, "Placas/" + id), {
      Nombre: placa,
      Id: id
    });
  }

module.exports = {
    new_ruta,
    read_point
  }