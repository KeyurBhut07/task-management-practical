const Joi = require('joi')

const nameSchema = Joi.string().required()
const descriptionSchema = Joi.string().optional()
const statusSchema = Joi.string().valid('To-Do', 'In Progress', 'Done').default('To-Do');

const createTask = new Joi.object({
    name: nameSchema,
    description: descriptionSchema,
    status: statusSchema,
    createdBy : Joi.string().optional(),
})

module.exports = {
    createTask,
}
