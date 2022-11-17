const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

//CREAR NUEVA TAREA
exports.crear = async (req, res) => {
   //VALIDAR SI EXISTEN ERRORES
   const errores = validationResult(req);
   if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
   }

   const { proyecto } = req.body;
   try {
      const actualProyecto = await Proyecto.findById(proyecto);
      if (!actualProyecto) {
         res.status(400).json({ msg: 'Proyecto no encontrado' });
      }

      //REVISAR SI EL USUARIO ESTA AUTENTICADO
      if (actualProyecto.creador.toString() !== req.usuario.id) {
         return res.status(401).json({ msg: 'No autorizado' });
      }

      //SE CREA LA TAREA
      const tarea = new Tarea(req.body);
      await tarea.save();

      res.json({ msg: 'Tarea creeada exitosamente', tarea: tarea.toJSON() })

   } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
   }
}


//TAREAS POR PROYECTO
exports.obtener = async (req, res) => {

   try {
      const { proyecto } = req.query;

      const actualProyecto = await Proyecto.findById(proyecto);
      if (!actualProyecto) {
         res.status(400).json({ msg: 'Proyecto no encontrado' });
      }

      //REVISAR SI EL USUARIO ESTA AUTENTICADO
      if (actualProyecto.creador.toString() !== req.usuario.id) {
         return res.status(401).json({ msg: 'No autorizado' });
      }

      //OBTIENER TAREAS POR PROYECTO
      const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });

      res.json(tareas);

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

   try {
      const { proyecto, nombre, estado } = req.body;

      //SI LA TAREA EXISTE
      let tarea = await Tarea.findById(req.params.id);
      if (!tarea) {
         res.status(404).json({ msg: 'Tarea no encontrada' });
      }

      //SI EL PROYECTO EXISTE
      const actualProyecto = await Proyecto.findById(proyecto);

      //REVISAR SI EL USUARIO ESTA AUTENTICADO
      if (actualProyecto.creador.toString() !== req.usuario.id) {
         return res.status(401).json({ msg: 'No autorizado' });
      }

      //CREAR OBJETO CON LA NUEVA INFORMACION
      const nuevaTarea = {};
      nuevaTarea.nombre = nombre;
      nuevaTarea.estado = estado;
      //if (descripcion) nuevaTarea.descripcion = descripcion;

      //GUARDAR LA TAREA
      tarea = await Tarea.findByIdAndUpdate({ _id: req.params.id }, nuevaTarea, { new: true });
      res.json({
         msg: 'Actualizacion correcta',
         tarea: tarea.toJSON()
      });
   } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
   }
}

//ELIMINAR UNA TAREA
exports.eliminar = async (req, res) => {

   try {
      const { proyecto } = req.query;

      //SI LA TAREA EXISTE
      let tarea = await Tarea.findById(req.params.id);
      if (!tarea) {
         res.status(404).json({ msg: 'Tarea no encontrada' });
      }

      //SI EL PROYECTO EXISTE
      const actualProyecto = await Proyecto.findById(proyecto);

      //REVISAR SI EL USUARIO ESTA AUTENTICADO
      if (actualProyecto.creador.toString() !== req.usuario.id) {
         return res.status(401).json({ msg: 'No autorizado' });
      }

      //ELIMINAR

      await Tarea.findByIdAndRemove({ _id: req.params.id });
      res.json({ msg: 'Tarea eliminada' })
   } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
   }
}