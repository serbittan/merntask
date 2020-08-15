const { Router } = require('express')

const {
    registerUser,
    authenticateUser,
    retrieveUser,
    createProject,
    retrieveProjects,
    deleteProject,
    updateProject,
    createTask,
    retrieveTasks,
    deleteTask,
    updateTask
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
router.get('/projects', jwtVerifierMidWare, retrieveProjects)
router.delete('/projects/delete/:idProject', jwtVerifierMidWare, deleteProject)
router.patch('/projects/update/:idProject', jsonBodyParser, jwtVerifierMidWare, updateProject)

// task
router.post('/tasks', jwtVerifierMidWare, jsonBodyParser, createTask)
router.get('/tasks/:project', jwtVerifierMidWare, retrieveTasks)
router.delete('/tasks/delete/:project/:idTask', jwtVerifierMidWare, deleteTask)
router.patch('/tasks/update/:project/:idTask', jwtVerifierMidWare, jsonBodyParser, updateTask)


module.exports = router