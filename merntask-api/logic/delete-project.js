const { validate } = require("merntask-utils")
const { models: { User, Project } } = require('merntask-data')
const { NotFoundError, NotAllowedError } = require("merntask-errors")


const deleteProject = (id, idProject) => {
    validate.string(id, 'id')
    validate.string(idProject, 'idProject')
    console.log(id)
    return (async () => {
        const user = await User.findById(id)
        console.log(user)
        if (!user) throw new NotAllowedError(`user with id ${id} does not exist`)

        const project = await Project.findById(idProject)

        if (!project) throw new NotFoundError('project not found')

        delete project
    })()
}

module.exports = deleteProject