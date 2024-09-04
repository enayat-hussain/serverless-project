const Queue = require('bull');

const queue = new Queue('myQueue', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
});
const processJob = async (job) => {
  console.log('Processing job:');
  await job.completed();
};

// process the queue automatically when a job is added
queue.process(processJob);

module.exports = queue;
