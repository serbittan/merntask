const { validate } = require('merntask-utils')
const { NotFoundError } = require('merntask-errors')
const { models: { User } } = require('merntask-data')

const retrieveUser = (id) => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} it does not exist`)

            user.retrieved = new Date()

            user.id = user._id.toString()
            delete user._id
            delete user.__v

            return user.save()
        })
        .then(({ id, name, email }) => ({ id, name, email }))

}
module.exports = retrieveUser