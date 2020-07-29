const { Router } = require('express')

const {
    registerUser,
    authenticateUser
} = require('./handlers')

// ahora en las nuevas versiones de express tenemos express-validator:   app.use(express.json({ extended: true }))
// en este caso lo hacemos con el bodyParser tradicional.
const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()

const router = new Router()

//usuarios
router.post('/users', jsonBodyParser, registerUser)
router.post('/users/auth', jsonBodyParser, authenticateUser)


module.exports = router