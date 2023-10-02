// updateSelectBox.js
const { realdb }  = require('./../../connection.js');
require('firebase/database');
const selectBox = document.getElementById('selectBox');

// Obtén una referencia a la ubicación en Firebase donde se encuentra la lista de datos
const dataRef = realdb.ref("conductores/" + "prueba");

// Escucha cambios en la lista de datos y actualiza el select box
dataRef.on('value', (snapshot) => {
  const dataList = snapshot.val();

  // Limpia el select box antes de agregar nuevas opciones
  selectBox.innerHTML = '';

  // Agrega las opciones al select box
  for (const key in dataList) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = dataList[key];
    selectBox.appendChild(option);
  }
});