const { validate } = require("merntask-utils")
const { models: { User, Project } } = require('merntask-data')
const { NotFoundError, NotAllowedError, ContentError } = require("merntask-errors")


const deleteProject = (id, idProject) => {
    validate.string(id, 'id')
    validate.string(idProject, 'idProject')

    if (!idProject) throw new NotFoundError('no project were found matching your request')

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotAllowedError(`user with id ${id} does not exist`)

        const projectDeleted = await Project.findOneAndRemove({ _id: idProject })  // los otros métodos pueden ser deprecated


        return  projectDeleted
    })()
}

module.exports = deleteProject