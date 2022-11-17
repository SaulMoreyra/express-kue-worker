require('dotenv').config({ path: 'variables.env' });
const nodemailer = require('nodemailer');

config = {
   host: 'smtp.gmail.com',
   port: 465,
   secure: true,
   auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS
   }
}
module.exports = nodemailer.createTransport(config);

