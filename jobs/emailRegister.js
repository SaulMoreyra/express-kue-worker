const Mail = require('../lib/Email');

module.exports = {
   jobId: "RegistrationMail",
   async handle({ data, done }) {
      try {
         const { to, name, subject, content } = data.user;
         const dataMail = {
            from: `EmailRegister <goldenhunter21@gmail.com>`,
            to: `${name} <${to}>`,
            subject: `${subject} ✔`,
            text: `${content} ${new Date()} ✔`,
            html: `<b>${content} ${new Date()} ✔</b>`
         }
         await Mail.sendMail(dataMail);
         done();
      } catch (error) {
         done(error);
      }
   }
}
