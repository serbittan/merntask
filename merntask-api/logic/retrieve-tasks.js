const { validate } = require('merntask-utils')
const { NotAllowedError, NotFoundError, ContentError } = require('merntask-errors')
const { models: { Project, Task } } = require('merntask-data')

const retrieveTasks = (id, project) => {
    validate.string(id, 'id')
    validate.string(project, 'project')

    if (!project) throw new NotFoundError('no project were found matching your request')
    
    return (async () => {
        const projectExist = await Project.findById(project)

        if (!projectExist) throw new NotFoundError(`project with id ${project} does not exist`)

        if (projectExist.creator.toString() !== id) throw new NotAllowedError(`user with id ${id} does not exist`)

        // const user = await User.findById(id)
        // if (!user) throw new NotAllowedError(`user with id ${id} does not exist`)
        

        const tasks = await Task.find({ project }).sort({ date: -1}).lean()

        if (!tasks.length) throw new ContentError('this project does not tasks yet')
        
        tasks.forEach(task => {
            task.id = task._id.toString()

            delete task._id
            delete task.__v
        }) 

        return tasks


    })()
}
module.exports = retrieveTasks