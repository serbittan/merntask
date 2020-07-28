const { registerUser } = require('../../logic')

module.exports = (req, res) => {
    const { body: { name, email, password } } = req
    console.log(req.body)
    try{
        registerUser(name, email, password)
            .then(() => res.status(201).end())
            .catch(error => { res.send('error')})

    } catch (error) {

    }
}