const { validate } = require('merntask-utils')
const { NotAllowedError, ContentError } = require('merntask-errors')
const { models: { User, Project } } = require('merntask-data')

const createProject = (title, id) => {
    validate.string(title, 'title')
    validate.string(id, 'id')

    return (async () => {
        const user = await User.findById(id)
        
        if (!user) throw new NotAllowedError(`user with ${id} not exits`)

        const project = await new Project({ title })

        if (!project) throw new ContentError(`project ${title} is not created correctly`)

        project.creator = user.id

        return project.save()
    })()
    
}

module.exports = createProject

