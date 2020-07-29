const { validate } = require("merntask-utils")
const { models: { User } } = require("merntask-data")
const { NotAllowedError } = require('merntask-errors')
const bcrypt = require('bcrypt')



const authenticateUser = (email, password) => {
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    return User.findOne({ email })
        .then(user => {
            if (!user) throw new NotAllowedError(`This email ${email} is an invalid email`)

            return bcrypt.compare(password, user.password)
                .then(validPassword => {
                    if (!validPassword) throw new NotAllowedError('wrong credentials')

                    user.authenticate = new Date

                    return user.save()
                })
                .then(({ id }) => id)
        })
}

module.exports = authenticateUser