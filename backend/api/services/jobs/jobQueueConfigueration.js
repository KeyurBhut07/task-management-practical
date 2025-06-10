const Queue = require('bull')
const { REDIS } = require('../../../config/config')

const opts = {
    redis: {
        port: REDIS.PORT,
        host: REDIS.HOST,
        db: 4,
        options: {},
    },
}

const sendEmailQueueOpts = {
    redis: {
        port: REDIS.PORT,
        host: REDIS.HOST,
        db: 1,
        options: {},
    },
}

const bullQueue = new Queue('bullQueue', opts)
const sendMailQueue = new Queue('sendMailQueue', sendEmailQueueOpts)

const handleFailure = (job, err) => {
    if (job.attemptsMade >= job.opts.attempts) {
        console.info(`🤯 Job failures above threshold ${job.name}`, err)
        job.remove()
        return null
    }
    console.info(
        `🤯   Job ${job.name} failed with ${err.message}. ${
            job.opts.attempts - job.attemptsMade
        } attempts left`
    )
}

const handleCompleted = (job) => {
    console.info(`🌿 Job ${job.name} completed`)
    job.remove()
}

const handleStalled = (job) => {
    console.info(`🌿 Job ${job.name} stalled`)
}

bullQueue.on('failed', handleFailure)
bullQueue.on('completed', handleCompleted)
bullQueue.on('stalled', handleStalled)

sendMailQueue.on('failed', handleFailure)
sendMailQueue.on('completed', handleCompleted)
sendMailQueue.on('stalled', handleStalled)

console.info('bull-job-queue loaded 🎯')

module.exports = {
    bullQueue,
    sendMailQueue,
}
