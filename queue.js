require('dotenv').config({ path: 'variables.env' });
const redis = require('./config/redis')
const { emailRegister, userReport, createFile } = require('./jobs');
const kue = require('kue');

const queue = kue.createQueue(redis);

const jobs = {
   [emailRegister.jobId]: emailRegister.handle,
   [userReport.jobId]: userReport.handle,
   [createFile.jobId]: createFile.handle
}


queue.on('error', (error) => {
   // eslint-disable-next-line no-console
   console.error('Job error: ', error);
});


queue.process('worker', (job, done) => {
   try {
      const { jobId } = job.data;
      console.log(jobId);
      if (!jobs[jobId]) {
         // console.log('worker: ', 'Job not found...');
         done(new Error('Job not found'));
      }
      // console.log('worker: ', 'Job found...');
      jobs[jobId]({ ...job.data, done });
   } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
   }
});