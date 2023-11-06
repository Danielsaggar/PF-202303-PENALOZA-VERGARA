var express = require('express');
var router = express.Router();
const { realdb } = require("../../googleinit")
const { ref, set, onValue, onChildChanged, updat, get  } =require("firebase/database");

const usuariosOnline = ref(realdb, "conductores/");

/* GET home page. */
router.get('/online', async function(req, res, next) {  
  const arrayUser =[]
  await get(usuariosOnline)
  .then((snapshot) => {
    if (snapshot.exists()) {
      // snapshot.val() contiene los datos en esa ruta como un objeto JavaScript.
      const datos = snapshot.val();      
      for (const nombreColeccion in datos) {
        // Verifica si la propiedad es un objeto (para excluir 'latitude' y 'longitude').
        if (typeof datos[nombreColeccion] === 'object') {          
            const userData = {
                nombre: nombreColeccion,
                Placa: datos[nombreColeccion].Placa,
                latitude: datos[nombreColeccion].latitude,
                longitude: datos[nombreColeccion].longitude
              };
              arrayUser.push(userData);
        }
      }      
    } else {
      console.log('No existen datos en la ruta especificada.');
    }
  })
  .catch((error) => {
    console.error('Error al obtener datos:', error);
  });    
  res.send(arrayUser);
});

module.exports = router;