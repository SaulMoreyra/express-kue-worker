//RUTAS PARA AUTENTICAR USUARIOS
const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController')

//CREA USUARIOS  
// api/send-email
router.post('/', emailController.send)
router.post('/user', emailController.user)
router.get('/createfile', emailController.createFile)

module.exports = router;