const Proyecto = require('../models//Proyecto');
const { validationResult } = require('express-validator');


exports.crear = async (req, res) => {
   try {
      //VALIDAR SI EXISTEN ERRORES
      const errores = validationResult(req);
      if (!errores.isEmpty()) {
         return res.status(400).json({ errores: errores.array() });
      }

      //CREAR PROYECTO
      const proyecto = new Proyecto(req.body);

      //SE GUARDA EL CREADOR USANSO MIDDLEWARE JWT VERIFY
      proyecto.creador = req.usuario.id;

      //SE CREA EL PROYECTO
      proyecto.save();
      return res.json({
         msg: 'Proyecto creado exitosamente!',
         proyecto: proyecto.toJSON()
      });

   } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
   }
}

//OBTIENE TODOS LOS PROYECTOS DEL USUARIO ACTUAL
exports.obtener = async (req, res) => {
   try {
      const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ creado: -1 });
      res.json([...proyectos])
   } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
   }
}

//ACTUALIZAR PROYECTO

exports.actualizar = async (req, res) => {
   //VALIDAR SI EXISTEN ERRORES
   const errores = validationResult(req);
   if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
   }

   //EXTRAER INFORMACION PROYECTO
   const { nombre } = req.body;
   const nuevoProyecto = {};

   if (nombre) {
      nuevoProyecto.nombre = nombre;
   }

   try {
      //REVISAR EL ID
      let proyecto = await Proyecto.findById(req.params.id);

      //SI EL PROYECTO EXISTE 
      if (!proyecto) {
         return res.status(404).json({ msg: 'Proyecto no encontrado' });
      }

      //VERIFICAR AL CREADOR DEL PROYECTO
      if (proyecto.creador.toString() !== req.usuario.id) {
         return res.status(401).json({ msg: 'No autorizado' });
      }

      //ACTUALIZAR
      proyecto = await Proyecto.findByIdAndUpdate(
         { _id: req.params.id },
         { $set: nuevoProyecto },
         { new: true }
      );

      res.json({ msg: 'Actualizado exitosamente!', proyecto: proyecto.toJSON() })


   } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
   }
}

//ELIMINAR UN PROYECTO
exports.eliminar = async (req, res) => {
   try {
      //REVISAR EL ID
      let proyecto = await Proyecto.findById(req.params.id);

      //SI EL PROYECTO EXISTE 
      if (!proyecto) {
         return res.status(404).json({ msg: 'Proyecto no encontrado' });
      }

      //VERIFICAR AL CREADOR DEL PROYECTO
      if (proyecto.creador.toString() !== req.usuario.id) {
         return res.status(401).json({ msg: 'No autorizado' });
      }

      await Proyecto.findOneAndRemove({ _id: req.params.id })
      res.json({ msg: 'Proyecto eliminado!' })
   } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error");
   }
}