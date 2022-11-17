const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

router.post('/',
   auth,
   [
      check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(),
   ],
   proyectoController.crear
);

router.get('/',
   auth,
   proyectoController.obtener
);

router.put('/:id',
   auth,
   [
      check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(),
   ],
   proyectoController.actualizar
);

router.delete('/:id',
   auth,
   proyectoController.eliminar
);

module.exports = router;