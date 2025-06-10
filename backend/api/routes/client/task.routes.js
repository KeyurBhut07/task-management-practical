const express = require('express')
const { isAuthenticate } = require('../../policies/authMiddleware')
const taskValidation = require('../../helpers/utils/validations/task')
const routes = express.Router()
const validate = require('../../policies/validate')
const taskController = require('../../controllers/client/task.controller')

routes.post(
    '/create',
    isAuthenticate,
    validate(taskValidation.createTask),
    taskController.createTask
)

routes.get('/:taskId', isAuthenticate, taskController.getTaskById)

routes.post('/all' , isAuthenticate , taskController.getAllTask)

routes.put("/update/:taskId",isAuthenticate, taskController.updateTask)

routes.delete("/delete/:taskId", isAuthenticate, taskController.deleteTask)

module.exports = routes
