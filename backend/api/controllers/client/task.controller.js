const taskServices = require('../../services/task.service')

const createTask = catchAsync(async (req, res) => {
    const { name, description, status } = req.body
    const result = await taskServices.createTask(name, description, status)
    if (result.flag) {
        res.message = _localize('module.create', req, 'Task')
        return utils.successResponse(result.data, res)
    } else {
        message = _localize(result.data, req)
        return utils.failureResponse(message, res)
    }
})

const getTaskById = catchAsync(async (req, res) => {
    const { taskId } = req.params
    const result = await taskServices.getTaskById(taskId)
    if (result.flag) {
        res.message = _localize('module.get', req, 'Task')
        return utils.successResponse(result.data, res)
    } else {
        message = _localize(result.data, req, 'Task')
        return utils.failureResponse(message, res)
    }
})

const getAllTask = catchAsync(async (req, res) => {
    const result = await taskServices.getAllTask(req.body)
    if (result.flag) {
        res.message = _localize('module.get', req, 'Task')
        return utils.successResponse(result.data, res)
    } else {
        message = _localize(result.data, req, 'Task')
        return utils.failureResponse(message, res)
    }
})

const updateTask = catchAsync(async (req, res) => {
    const { taskId } = req.params
    const result = await taskServices.updateTask(taskId , req.body)
    if (result.flag) {
        res.message = _localize('module.update', req, 'Task')
        return utils.successResponse(result.data, res)
    } else {
        message = _localize(result.data, req, 'Task')
        return utils.failureResponse(message, res)
    }
})

const deleteTask = catchAsync(async (req, res) => {
    const { taskId } = req.params
    const result = await taskServices.deleteTask(taskId)
    if (result.flag) {
        res.message = _localize('module.delete', req, 'Task')
        return utils.successResponse(result.data, res)
    } else {
        message = _localize(result.data, req, 'Task')
        return utils.failureResponse(message, res)
    }
})

module.exports = {
    createTask,
    getTaskById,
    getAllTask,
    updateTask,
    deleteTask
}
