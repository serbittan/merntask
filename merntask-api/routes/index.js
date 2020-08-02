const { Router } = require('express')

const {
    registerUser,
    authenticateUser,
    retrieveUser,
    createProject,
    retrieveProjects,
    deleteProject
} = require('./handlers')

const { jwtVerifierMidWare } = require('../mid-wares')

// ahora en las nuevas versiones de express tenemos express-validator:   app.use(express.json({ extended: true }))
// en este caso lo hacemos con el bodyParser tradicional.
const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()

const router = new Router()

// usuarios
router.post('/users', jsonBodyParser, registerUser)
router.post('/users/auth', jsonBodyParser, authenticateUser)
router.get('/users', jwtVerifierMidWare, retrieveUser )

// projects
router.post('/projects', jwtVerifierMidWare, jsonBodyParser, createProject)
router.get('/projects/:id', jwtVerifierMidWare, retrieveProjects)
router.delete('/projects/delete/:idProject', jwtVerifierMidWare, deleteProject)


module.exports = router