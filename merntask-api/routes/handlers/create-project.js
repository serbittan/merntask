const { createProject } = require(".")


module.exports = (req, res) => {

    try {
        createProject()
         .then(() => {
             
         })
    } catch(error) {

    }
}