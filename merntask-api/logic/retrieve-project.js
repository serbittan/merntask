const { validate } = require("merntask-utils")
const { NotAllowedError } = require('merntask-errors')
const { models: { User, Project } } = require('merntask-data')


const retrieveProject = (id, idProject) => {
    validate.string(id, 'id')
    validate.string(idProject, 'idProject')

    return (async () => {
        const userlogged = await User.findById({ _id: id })

        if (!userlogged) throw new NotAllowedError(`user with ${id} does not exist`)

        const project = await Project.findById({ _id: idProject })

        if (!project) throw new NotFoundError(`project with ${idProject} not found`)

        idProject = id
        project.id = project._id.toString()
        delete project._id
        delete project._v

        return project.save()
    })()
}

module.exports = retrieveProject