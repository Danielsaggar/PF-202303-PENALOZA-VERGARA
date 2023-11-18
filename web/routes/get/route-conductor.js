const express = require('express');
const router = express.Router();
const { db, realdb } = require("../../connection")

//Ruta de conexión con el backend
router.get('/conductor', async (req, res) => {  
    const placaId = req.query.placaId;       
    const nombreRef = realdb.ref('conductores');      

    //Aquí puedes buscar el documento en Firestore usando el placaId      
    const baka = true    


    nombreRef.orderByChild('Placa').equalTo(placaId).once('value', (snapshot) => {
      const conductores = [];
      snapshot.forEach((childSnapshot) => {
        // Itera sobre los resultados de la consulta
        const conductor = childSnapshot.val();
        conductores.push(conductor);
      });
    
      if (conductores.length > 0) {
        // Se encontraron conductores con la placa especificada        
        res.send(conductores);
      } else {
        // No se encontraron conductores con la placa especificada
        console.log('No se encontraron conductores con la placa', placaId);
        res.send([]);
      }
    });
  
});

module.exports = router;