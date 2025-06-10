const { bullQueue, sendMailQueue } = require('./jobQueueConfigueration.js')
const { createBullBoard } = require('@bull-board/api')
const { BullAdapter } = require('@bull-board/api/bullAdapter')
const { ExpressAdapter } = require('@bull-board/express')
const { JOB_NAME } = require('../../../config/constants/queueConstant')
const basicAuth = require('express-basic-auth')

const createJob = async (name, data, options) => {
    const opts = { priority: 0, attempts: 3, delay: 2000 }
    switch (name) {
        case JOB_NAME.SENDMAIL:
            sendMailQueue.add(name, data, {
                priority: options.priority || opts.priority,
                attempts: options.attempts || opts.attempts,
                delay: options.delay || opts.delay,
                removeOnComplete: true,
                removeOnFail: false,
            })
            break
    }
}

// queue middleware function.
const queueMiddleware = basicAuth({
    users: { ['cogtix']: 'cogtix' },
    challenge: true,
})

// To check all jobs in bull-board UI.
const myServerAdapter = new ExpressAdapter()
myServerAdapter.setBasePath('/bull')
createBullBoard({
    queues: [new BullAdapter(sendMailQueue)],
    serverAdapter: myServerAdapter,
})

module.exports = { createJob, myServerAdapter, queueMiddleware }
