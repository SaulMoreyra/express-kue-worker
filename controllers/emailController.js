const Job = require('../lib/JobKue');

exports.send = async (req, res) => {
   const { to, name, subject, content } = req.body;

   const user = { to, name, subject, content };
   const job = new Job('RegistrationMail', { user });
   job.offer();

   return res.json({ msg: `We will send a message to ${to}` });
}

exports.user = async (req, res) => {
   const { to, name, subject, content } = req.body;

   const user = { to, name, subject, content };
   const job = new Job('UserReport', { user });
   job.offer();

   return res.json({ msg: `We will send a message to ${to}` });
}


exports.createFile = async (req, res) => {
   const { to, name, subject, content } = req.body;

   const job = new Job('CreateFile');
   job.offer();

   return res.json({ msg: `We will send a message to ${to}` });
}


