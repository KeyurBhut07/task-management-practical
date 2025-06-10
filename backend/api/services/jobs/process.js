const { bullQueue, sendMailQueue } = require('./jobQueueConfigueration')
const Jobs = require('./jobs')
for (let identity in Jobs._processors) {
    sendMailQueue.process(identity, 1, Jobs._processors[identity])
    // bullQueue.process(identity, 1, Jobs._processors[identity])
}
