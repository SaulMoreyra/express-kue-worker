//RUTAS PARA AUTENTICAR USUARIOS
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

//CREA USUARIOS
// api/auth
router.post('/',
   [
      check('email', 'Agrega un email valido').isEmail(),
      check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6, max: 12 })
   ],
   authController.authUser
)

router.get('/',
   auth,
   authController.authenticatedUser
);

module.exports = router;