const { validate } = require('merntask-utils')
const { models: { Project, Task } } = require('merntask-data')
const { NotAllowedError, NotFoundError } = require('merntask-errors')


const createTask = (id, name, project) => {
    validate.string(id, 'id')
    validate.string(name, 'name')
    validate.string(project, 'project')
    
    return (async () => {
        const projectExist = await Project.findById(project)

        if (!projectExist) throw new NotFoundError(`project does not exist`)

        if (projectExist.creator.toString() !== id) throw new NotAllowedError(`user with id ${id} does not exist`)

        const task = await new Task({ name, project })

        task.date = new Date()

        await task.save()

        const newTask = await Task.findOne({ name }).lean()

        if (!newTask) throw new NotFoundError(`task with name ${name} does not exist`)

        newTask.id = newTask._id.toString()

        delete newTask._id
        delete newTask.__v

        return newTask
        
    })()

    
}
    module.exports = createTask
