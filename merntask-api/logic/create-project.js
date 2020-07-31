const { validate } = require('merntask-utils')
const { NotFoundError } = require('merntask-errors')
const { models: { Project } } = require('merntask-data')

const createProject = (name) => {
    validate.string(name, 'name')

    return (async () => {
        const project = await Project.findOne({ name })

        if (project) throw new NotFoundError(`the project ${project} already exist`)

        project = new Project({ name })

        return project.save()
    })()
    
}

module.exports = createProject