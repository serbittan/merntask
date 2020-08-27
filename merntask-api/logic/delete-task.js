const { validate } = require("merntask-utils")
const { NotFoundError, NotAllowedError } = require("merntask-errors")
const { models: { Task, Project } } = require("merntask-data")



const deleteTask = (id, project, idTask) => {
    validate.string(id, 'id')
    validate.string(project, 'project')
    validate.string(idTask, 'idTask')
    

    if (!idTask) throw new NotFoundError('no Task were found matching your request')

    return (async () => {
        const projectExist = await Project.findById(project)

        if (!projectExist) throw new NotFoundError(`project with id ${project} does not exist`)

        if (projectExist.creator.toString() !== id) throw new NotAllowedError(`user with id ${id} does not exist`)

        const taskDeleted = await Task.findOneAndRemove({ _id: idTask })

        return taskDeleted
        
    })()
}
module.exports = deleteTask