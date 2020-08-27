const { validate } = require("merntask-utils")
const { NotAllowedError, NotFoundError, ContentError } = require("merntask-errors")
const { models: { Project, Task } } = require('merntask-data')


const updateTask = (id, idTask, project, body) => {
    validate.string(id, 'id')
    validate.string(idTask, 'idTask')
    validate.string(project, 'project')
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

    
    if (!idTask) throw new NotFoundError('not found task matched with request')
    
    return (async () => {
        const { name, state } = body

        let tareaExist = await Task.findById(idTask)
        
        if (!tareaExist) throw new NotFoundError(`task with id ${idTask} does not exist`)

        const projectExist = await Project.findById(project)
        
        if (!projectExist) throw new NotFoundError(`project with id ${project} does not exist`)

        if (projectExist.creator.toString() !== id) throw new NotAllowedError(`user with id ${id} does not exist`)

        tareaExist = await Task.findOneAndUpdate({ _id: idTask}, { name, state }, { new: true }).lean()

        
        tareaExist.id = tareaExist._id.toString()
        delete tareaExist._id
        delete tareaExist.__v
        
        return tareaExist

    })()
}

module.exports = updateTask