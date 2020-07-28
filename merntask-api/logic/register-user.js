const { validate } = require('merntask-utils')
const { models: { User } } = require('merntask-data')
const { NotAllowedError } = require('merntask-errors')
const bcrypt = require('bcrypt')

const registerUser = (name, email, password) => {
    console.log(name)
    validate.string(name, 'name')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')
    console.log(name)
    return User.findOne({ email })
        .then(user => {
            debugger
            if (user) throw new NotAllowedError(`user with email ${email} already exist`)

            //hashear el password
            return bcrypt.hash(password, 10)
        })
        .then(password => {
            const user = new User({ name, email, password })
            console.log(user)
            return user.save().send('user created correctly')
        })
}

module.exports = registerUser