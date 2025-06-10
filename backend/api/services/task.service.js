const Tasks = require('../models/task.model.js')

const createTask = async (name, description, status) => {
    try {
        const task = new Tasks({
            title: name,
            description,
            status,
        })

        await task.save()

        return { flag: true, data: task }
    } catch (error) {
        logger.error('Error - createTask Service', error)
        throw new Error(error)
    }
}

const getTaskById = async (id) => {
    try {
        const task = await Tasks.findById(id)
        if (!task) {
            return { flag: false, data: 'module.notFound' }
        }
        return { flag: true, data: task }
    } catch (error) {
        logger.error('Error - getTaskById Service', error)
        throw new Error(error)
    }
}

const getAllTask = async (body) => {
    try {
        const { search, status, page = 1, pageSize = 10 } = body

        let filter = {}

        if (search) {
            filter.title = { $regex: search, $options: 'i' } // Case-insensitive search
            filter.description = { $regex: search, $options: 'i' } // Case-insensitive search
        }

        if (status) {
            filter.status = status
        }

        const skip = (page - 1) * pageSize

        const tasks = await Tasks.find(filter).skip(skip).limit(pageSize)

        const totalCount = await Tasks.countDocuments(filter)

        if (!tasks || tasks.length === 0) {
            return { flag: false, data: 'module.notFound' }
        }

        // Group tasks by status
        const groupedTasks = tasks.reduce((acc, task) => {
            if (!acc[task.status]) {
                acc[task.status] = []
            }
            acc[task.status].push(task)
            return acc
        }, {})

        // Calculate the total number of pages
        const totalPages = Math.ceil(totalCount / pageSize)

        return {
            flag: true,
            data: {
                tasks: groupedTasks,
                pagination: {
                    currentPage: page,
                    pageSize: pageSize,
                    totalPages: totalPages,
                    totalCount: totalCount,
                },
            },
        }
    } catch (error) {
        logger.error('Error - getTaskById Service', error)
        throw new Error(error)
    }
}

const updateTask = async (id, body) => {
    try {
        const { name, description, status, assignedUser } = body

        const updateData = {
            ...(name && { title: name }),
            ...(description && { description: description }),
            ...(status && { status: status }),
            ...(assignedUser && { assignedUser: assignedUser }),
        }

        if (Object.keys(updateData).length === 0) {
            return res
                .status(400)
                .json({ flag: false, data: 'No valid fields to update' })
        }

        // Find the task by ID and update it with the new data
        const updatedTask = await Tasks.findByIdAndUpdate(id, updateData, {
            new: true,
        })

        if (!updatedTask) {
            return res
                .status(404)
                .json({ flag: false, data: 'module.notFound' })
        }

        return {
            flag: true,
            data: updatedTask,
        }
    } catch (error) {
        logger.error('Error - updateTask Service', error)
        throw new Error(error)
    }
}

const deleteTask = async (id) => {
    try {
        const task = await Tasks.findByIdAndDelete(id)
        if (!task) {
            return { flag: false, data: 'module.notFound' }
        }
        return { flag: true, data: task }
    } catch (error) {
        logger.error('Error - deleteTask Service', error)
        throw new Error(error)
    }
}

module.exports = {
    createTask,
    getTaskById,
    getAllTask,
    deleteTask,
    updateTask,
}
