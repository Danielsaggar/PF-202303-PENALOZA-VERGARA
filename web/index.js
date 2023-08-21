const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const port = process.env.PORT;

// Se indica el motor del plantillas a utilizar
app.set('view engine', 'pug');

//Definir la ruta dónde se hará el llamado de los archivos JS y CSS
const indexRouter = require('./routes/get/route-index');
const asignacionRouter = require('./routes/get/route-asignacion');
const placaRouter = require('./routes/post/route-placa');
const rutasRouter = require('./routes/post/route-rutas');

app.use(express.static('public'));

//Manejo de solicitudes GET
app.use('/', indexRouter);
app.use('/', asignacionRouter);

//Manejo de solicitudes POST
app.use('/placa', placaRouter);
app.use('/ruta', rutasRouter);


// Puerto de escucha
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
