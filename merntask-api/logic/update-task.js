const { validate } = require("merntask-utils")
const { NotAllowedError, NotFoundError, ContentError } = require("merntask-errors")
const { models: { Project, Task } } = require('merntask-data')


const updateTask = (id, idTask, body) => {
    validate.string(id, 'id')
    validate.string(idTask, 'idTask')
    validate.type(body, 'body', Object)

    // para versiones con mas key/value en el objeto body
    const validKeysObject = ['name', "state", 'project']

    for (const key in body) {
        if (!validKeysObject.includes(key)) {
            throw new NotAllowedError(`field ${key} cannot modified`)
        } else if (!body.name && !body.status) {
            throw new ContentError('this field should be fill')
        }

    }

    const { name, state, project } = body

    if (!idTask) throw new NotFoundError('not found task matched with request')

    return (async () => {

        const tareaExist = await Task.findById(idTask)

        if (!tareaExist) throw new NotFoundError(`task with id ${idTask} does not exist`)

        const projectExist = await Project.findById(project)

        if (!projectExist) throw new NotFoundError(`project with id ${project} does not exist`)
        if (projectExist.creator.toString() !== id) throw new NotAllowedError(`user with id ${id} does not exist`)

        const taskUpdated = await Task.findByIdAndUpdate({ _id: idTask }, { name, state }, { new: true }).lean()

        taskUpdated.id = taskUpdated._id.toString()
        delete taskUpdated._id
        delete taskUpdated.__v

        return taskUpdated

    })()
}

module.exports = updateTask