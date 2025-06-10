const express = require('express')
const router = express.Router()

const fileRoutes = require('./file')
const queueRoutes = require('../../services/jobs/index')

router.use('/files', fileRoutes)

router.use(
    '/bull',
    queueRoutes.queueMiddleware,
    queueRoutes.myServerAdapter.getRouter()
)

module.exports = router
