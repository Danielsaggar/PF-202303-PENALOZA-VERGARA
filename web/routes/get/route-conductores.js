var express = require('express');
var router = express.Router();
const { db } = require("../../connection")

router.get('/placa/:placaId', async function(req, res, next) {      
    const placaId = req.params.placaId;    
    const collectionRef = db.collection('rutas');
    const baka = false
    //Aquí puedes buscar el documento en Firestore usando el placaId
    const querySnapshot = await collectionRef    
    .get();
    const documents = querySnapshot.docs.map(doc => doc.data());
    //console.log("Query: ", documents)           
    // Luego renderiza una plantilla de edición pasando los datos del documento
    res.render('edit', {documents, placaId, baka});
  });
  
  module.exports = router;