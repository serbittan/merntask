const { Router } = require('express')

const {
    registerUser
} = require('./handlers')

const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()
//ahora en las nuevas versiones de express tenemos:   app.use(express.json({ extended: true }))

const router = new Router()

//usuarios
router.post('/users', jsonBodyParser, registerUser)


module.exports = router