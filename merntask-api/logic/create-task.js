const { validate } = require('merntask-utils')
const { models: { User, Project, Task } } = require('merntask-data')
const { ContentError, NotAllowedError } = require('merntask-errors')


const createTask = (id, name, project) => {
    validate.string(id, 'id')
    validate.string(name, 'name')
    validate.string(project, 'project')
    
    return (async () => {
        const projectExist = await Project.findById(project)

        if (!projectExist) throw new NotFoundError(`project does not exist`)

        if (projectExist.creator.toString() !== id) throw new NotAllowedError(`user with id ${id} does not exist`)

        const task = await new Task({ name })

        task.date = new Date()
        task.project = project

        return task.save()
    })()

    
}
    module.exports = createTask
