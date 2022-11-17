const express = require('express');
const router = express();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

router.post('/',
   auth,
   [
      check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
      check('proyecto', 'El proyecto de la tarea es obligatorio').not().isEmpty(),
   ],
   tareaController.crear
);

router.get('/',
   auth,
   tareaController.obtener
);


router.put('/:id',
   auth,
   tareaController.actualizar
);


router.delete('/:id',
   auth,
   tareaController.eliminar
);

module.exports = router;