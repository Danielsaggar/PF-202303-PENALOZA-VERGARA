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
const conductoresRouter = require('./routes/get/route-conductores');
const OnlineUsers = require('./routes/get/users-online');
const Conductor = require('./routes/get/route-conductor');

const placaRouter = require('./routes/post/route-placa');
const rutasRouter = require('./routes/post/route-rutas');
const updateRouter = require('./routes/post/route-update');


app.use('/placa/public', express.static('public'));
app.use('/placa', express.static('public'));
app.use(express.static('public'));

//Manejo de solicitudes GET
app.use('/', indexRouter);
app.use('/', asignacionRouter);
app.use('/', conductoresRouter);
app.use('/', OnlineUsers);
app.use('/', Conductor);

//Manejo de solicitudes POST
app.use('/placa', placaRouter);
app.use('/ruta', rutasRouter);
app.use('/update', updateRouter);

// Configuración de la Content Security Policy (CSP)
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; font-src 'self' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline';"
  );
  next();
});

// Puerto de escucha
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
