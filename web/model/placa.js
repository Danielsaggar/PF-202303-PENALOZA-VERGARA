const { db } = require("../connection")
const { realdb } = require ("./../googleinit");
const { ref, set, onValue, onChildChanged, update } = require ("firebase/database");

// Crear un nuevo documento en una colección
async function new_placa(data) {                          
        const userDocRef = db.collection('vehiculos');               
        userDocRef.add(data)
        .then((docRef) => {
            console.log('Documento agregado con ID:', docRef.id);
            console.log('Documento creado exitosamente');            
            docRef.update({Id: docRef.id})
            console.log("Data:", data)
            real_placa(data.placa,docRef.id)
        })
        .catch((error) => {
            console.error('Error al crear el documento:', error);
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
    new_placa
  }