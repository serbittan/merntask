module.exports = (req, res) => {
    const { body: { name, email, password, oldpassword } } = req
    try{
        registerUser(name, email, password, oldpassword)
        .then(() => res.status(201).end())
        .catch(error => {})

    } catch (error) {

    }
}