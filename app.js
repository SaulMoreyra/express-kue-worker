const express = require('express');
const path = require('path');
const cors = require('cors');
const kue = require('kue');

//SE CREAL EL SERIVODR
const app = express();


//HABILITAR EXPRESS.JSON
app.use(express.json({ extended: true }));

//HABILITAR CORS
app.use(cors());

//PUERTO DE LA APP
app.set('port', process.env.PORT || 4000);

//AGREGO VISTA PARA INCIO
app.use(express.static(path.join(__dirname, 'public')));

//WORKER DASHBOARD BULL
app.use('/kue/admin', kue.app);

//IMPORTAR USUARIOSd
app.use('/api/usuarios', require('./routes/usuariosRoute'));
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/proyectos', require('./routes/proyectosRoute'));
app.use('/api/tareas', require('./routes/tareasRoute'));
app.use('/api/send-email', require('./routes/emailRoute'));


module.exports = app;