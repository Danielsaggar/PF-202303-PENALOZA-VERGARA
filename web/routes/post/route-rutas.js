const express = require('express');
const router = express.Router();
const { new_ruta } = require("../../model/ruta")
const { convert } = require("../../public/js/Json-map")

//Ruta de conexión con el backend
router.post('/', (req, res) => {  
    const data = req.body;  
    console.log("Data:", data)    
    const ruta = convert(data.marcadores)
    const paq= {
        Nombre: data.ruta,
        Puntos: ruta     
      }  
    console.log(paq)
    new_ruta(paq);
    res.redirect('/asignar'); 
});

module.exports = router;