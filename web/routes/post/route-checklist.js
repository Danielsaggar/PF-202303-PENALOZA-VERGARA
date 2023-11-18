const express = require('express');
const router = express.Router();
const { db, realdb } = require("../../connection")

//Ruta de conexión con el backend
router.post('/', async (req, res) => {  
    const data = req.body;      
    const placaId = data.placaId;    
    const nombreRef = realdb.ref('conductores');      
    
    nombreRef.orderByChild('Placa').equalTo(placaId).once('value', (snapshot) => {
      if (snapshot.exists()) {
        // snapshot contiene los conductores cuyo nombre es "Juan"
        const conductor = snapshot.val();        
        for (const key in conductor) {            
          nombreRef.child(key).update({
            Rutas: data.Rutas, // Actualiza la propiedad Rutas con las rutas existentes y la nueva ruta
          }, (error) => {
            if (error) {
              console.error(`Error al actualizar la ruta a ${key}:`, error);
            } else {
              console.log(`Actualización exitosamente a ${key}.`);
            }
          });
        }
      } else {
        console.log('No se encontraron conductores con el nombre "Juan"');
      }
    });
    res.send(true);    
});

module.exports = router;