const express = require('express');
const router = express.Router();
const { db, realdb } = require("../../connection")

//Ruta de conexión con el backend
router.post('/', async (req, res) => {  
    const data = req.body;  
    console.log("Data:", data)
    const placaId = data.placaId;    
    console.log("Placa: ", placaId)
    const collectionRef = db.collection('rutas');    
    const nombreRef = realdb.ref('conductores');      

    //Aquí puedes buscar el documento en Firestore usando el placaId
    const querySnapshot = await collectionRef    
    .where('Id', '==', data.Ruta)
    .get();
    const documents = querySnapshot.docs.map(doc => doc.data());  
    const baka = true    
    const Nuevaruta = {
      "Ruta": documents[0].Nombre,
      "Id_Ruta": data.Ruta,
      "Puntos": documents[0].Puntos.map((punto) => {
        // Agrega un campo "Descripción" a cada punto
        return {
          ...punto, // Mantiene los campos existentes
          "check": false
        };
      }),
    };
    
    nombreRef.orderByChild('Placa').equalTo(placaId).once('value', (snapshot) => {
      if (snapshot.exists()) {
        // snapshot contiene los conductores cuyo nombre es "Juan"
        const conductor = snapshot.val();
    
        for (const key in conductor) {
          // Obtén las rutas existentes y agrégales la nueva ruta
          const rutasExistente = conductor[key].Rutas || [];
          rutasExistente.push(Nuevaruta);
    
          nombreRef.child(key).update({
            Rutas: rutasExistente, // Actualiza la propiedad Rutas con las rutas existentes y la nueva ruta
          }, (error) => {
            if (error) {
              console.error(`Error al agregar nueva ruta a ${key}:`, error);
            } else {
              console.log(`Nueva ruta agregada exitosamente a ${key}.`);
            }
          });
        }
      } else {
        console.log('No se encontraron conductores con el nombre "Juan"');
      }
    });

    // res.redirect('/');
    console.log("Document post: ", documents) 
    res.redirect(`/placa/${placaId}`);
    // res.render('edit', {documents, placaId, baka});
});

module.exports = router;