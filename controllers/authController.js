const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {
   //SI EXISTEN ERRORES
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   //EXTRAER EMAIL Y PASSWORD
   const { email, password } = req.body;

   try {
      //VALIDAR SI EL USUARIO EXISTE
      let usuario = await Usuario.findOne({ email });
      if (!usuario) {
         return res.status(400).json({ msg: 'El usuario no existe' });
      }

      //VALIDAR PASSWORD
      const isPassValid = await bcryptjs.compare(password, usuario.password);
      if (!isPassValid) {
         return res.status(401).json({ msg: 'Contrasena incorrecta' });
      }

      //SI TODO ES CORRECTO EXISTE
      const payload = {
         usuario: { id: usuario.id }
      }

      jwt.sign(payload, process.env.SECRET_WORD, {
         expiresIn: 18000// 6 HOURs
         //expiresIn: 100// 5 HOURs
      }, (error, token) => {
         if (error) res.status(400).send("Hubo un error");
         else {
            res.json({
               msg: "Inicio de sesion exitosamente!",
               token
            });
         }
      });

   } catch (error) {
      res.status(400).send("Hubo un error");
   }
}


//Obtiene usuario autenticado
exports.authenticatedUser = async (req, res) => {
   try {
      const usuario = await Usuario.findById(req.usuario.id).select("-password");
      return res.status(200).json(usuario);
   } catch (error) {
      return res.status(500).json({ msg: "Hubo un error" });
   }
}