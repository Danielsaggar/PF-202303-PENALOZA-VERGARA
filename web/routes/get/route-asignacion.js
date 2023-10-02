var express = require('express');
var router = express.Router();
const { ref, get } = require("firebase/database");
const { realdb }  = require('./../../connection');


/* GET home page. */
router.get('/asignar', async function(req, res, next) {  
  try {
    // Obtener una referencia a la base de datos    

    // Obtener los datos de Firebase Realtime Database
    const datosSnapshot = await get(ref(realdb, "conductores/" + "prueba"));

    const datos = [];
    if (datosSnapshot.exists()) {
      datosSnapshot.forEach((childSnapshot) => {
        datos.push(childSnapshot.val());
      });
    }

    // Renderizar la plantilla Pug y pasar los datos
    res.render('asignacion'), { datos };
    
  } catch (error) {
    console.error("Error al obtener datos de Firebase:", error);
    res.status(500).send("Error al obtener los datos.");
  }
});

module.exports = router;