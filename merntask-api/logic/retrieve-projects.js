const { validate } = require("merntask-utils")
const { NotAllowedError, NotFoundError } = require('merntask-errors')
const { models: { User, Project } } = require('merntask-data')


const retrieveProjects = (id) => {
    validate.string(id, 'id')

    return (async () => {
        const userlogged = await User.findById(id)

        if (!userlogged) throw new NotAllowedError(`user with ${id} does not exist`)

        const project = await Project.find({ creator: id }).sort({ created: -1 }).lean()  
        // con lean obtengo el obj plano y puedo iterar sobre él para manipularlo. Sin él aplicar el for no cambia nada.
        // con el método sort invierto el orden de los proyectos. Tomo como ref la hora de creación del proyecto: created

        if (!project) throw new NotFoundError(`user with ${id} has not projects`)

        project.forEach(project => {
            project.id = project._id.toString()

            delete project._id
            delete project.__v
        })
        
        return  project

    })()
}

module.exports = retrieveProjects

