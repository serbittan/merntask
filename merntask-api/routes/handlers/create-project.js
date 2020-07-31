const { createProject } = require(".")


module.exports = (req, res) => {
    const { name } = req
    try {
        createProject(name)
         .then(() => {
             
         })
    } catch(error) {

    }
}