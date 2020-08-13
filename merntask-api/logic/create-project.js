const { validate } = require('merntask-utils')
const { NotAllowedError, ContentError, NotFoundError } = require('merntask-errors')
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

        await project.save()  //ESTE AWAIT ME HA VUELTO LOCO!!!!

        const newProject = await Project.findOne({ title }).lean()

        if (!newProject) throw new NotFoundError(`project with title ${title} is not found`)

        newProject.id = newProject._id.toString()

        delete newProject._id
        delete newProject.__v

        return newProject
    })()

}

module.exports = createProject



// mismo ejercicio pero con promesas
// return User.findById(id)
    //     .then(user => {
    //         if (!user) throw new NotAllowedError('user not exist')
    //         console.log(user)
    //         return user.save()
    //             .then(() => {
    //                 const project = new Project({ title })

    //                 return project
    //             })
    //             .then(project => {
    //                 project.creator = user.id

    //                 return project.save()
    //             })
    //             .then(() => {
    //                 return Project.findOne({ title }).lean()
    //             })
    //             .then(project => {
    //                 project.id = project._id.toString()
        
    //                 delete project._id
    //                 delete project.__v
        
    //                 return project
    //             })

        // })

