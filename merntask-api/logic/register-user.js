const { validate } = require('merntask-utils')
const { models: { User } } = require('merntask-data')
const { NotAllowedError } = require('merntask-errors')
const bcrypt = require('bcrypt')

const registerUser = (name, email, password) => {
    console.log(name)
    validate.string(name, 'name')
    validate.email(email, 'email')
    validate.string(password, 'password')

    return User.findOne({ email })
    .then(user => {
        if (user) throw new NotAllowedError(`user with email ${email} already exist`)

        //hashear el password
        return bcrypt.hash(password, 10)
    })
    .then(password => {
        const user = new User({ name, email, password})

        return user.save()
    })
}

module.exports = registerUser