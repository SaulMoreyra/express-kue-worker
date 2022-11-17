const redis = require('../config/redis');
const kue = require('kue');

const queue = kue.createQueue(redis);

const createJob = (jobId, data) => {
   const job = queue
      .create('worker', {
         title: jobId,
         jobId,
         data,
      })
      .removeOnComplete(true)
      .save();

   job.on('error', (error) => {
      console.error('Job error: ', error);
   });

   job.on('complete', (result) => {
      console.log(`Job completed with ${result} of data`);
   });
   return job;
};

class Job {
   constructor(jobId, data) {
      this.jobId = jobId;
      this.data = data;
   }

   offer() {
      this.job = createJob(this.jobId, this.data);
   }

   progress(completed, total, data = '') {
      this.job.progress(completed, total, data);
   }
}
module.exports = Job;