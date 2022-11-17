const app = require('./app');
const databaseConection = require('./config/db');
//ESTABLECER CONEXION CON LA BASE DE DATOS

//INICIAR LA APP
app.listen(app.get('port'), '0.0.0.0', async () => {
   const isConected = await databaseConection();
   console.log(`Database is ${isConected ? 'connected' : 'no connected'}`);
   console.log(`Server is working in port ${app.get('port')}`);
})

module.exports = app;