const moment = require('moment-timezone')
const { sendEmail } = require('../emailServices')

module.exports = {
    _processors: {
        sendMail: async ({ data }) => {
            try {
                console.log('processing email sent')
                await sendEmail(data)
                console.log('finish email sent')
            } catch (error) {
                logger.error('Error - sendMail', error)
            }
        },
    },
}
