const { validate } = require("merntask-utils/validate")
const { NotFoundError, NotAllowedError } = require("merntask-errors")
const { models: { Task, Project } } = require("merntask-data")



const deleteTask = (id, idTask, project) => {
    validate.string(id, 'id')
    validate.string(idTask, 'idTask')
    validate.string(project, 'project')

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