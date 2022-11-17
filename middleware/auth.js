const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
   //LEER TOKEN
   const token = req.header('x-auth-token');
   if (!token) {
      res.status(401).json({ msg: 'No hay token, permiso denegado' });
   }

   try {
      const cifrado = jwt.verify(token, process.env.SECRET_WORD);
      req.usuario = cifrado.usuario;
      next();
   } catch (error) {
      res.status(401).json({ msg: 'Token no valido' });
   }
}