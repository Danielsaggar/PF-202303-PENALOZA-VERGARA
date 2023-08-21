const express = require('express');
const router = express.Router();
const { new_placa } = require("../../model/placa")

//Ruta de conexión con el backend
router.post('/', (req, res) => {  
    const data = req.body;  
    console.log("Data:", data.placa)
    new_placa(data);
    res.redirect('/asignar'); 
});

module.exports = router;