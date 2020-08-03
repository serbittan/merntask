const { validate } = require('merntask-utils')
const { NotAllowedError } = require('merntask-errors')
const { models: { User, Project} } = require('merntask-data')
const project = require('merntask-data/schemas/project')

const updateProject = (id, idProject, title) => {
    validate.string(id, 'id')
    validate.string(idProject, 'idProject')
    validate.string(title, 'title')

    if (title === '') throw new ContentError(`is needed ${title} for update`)
    if (!idProject) throw new NotFoundError(`user with ${id} has not projects`)
    console.log(idProject)
    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotAllowedError(`user with ${id} does not exist`)

        const projectUpdated = await Project.findByIdAndUpdate(idProject, { title }, { new: true }).lean()

        projectUpdated.idProject = projectUpdated._id.toString()

        delete projectUpdated._id
        delete projectUpdated.__v

        return projectUpdated

    })()
}

module.exports = updateProject