const { updateProject } = require("../../logic")
const { NotAllowedError,TypeError, ContentError } = require("merntask-errors")



module.exports = (req, res) => {
    const { payload: { sub: id }, params: { idProject }, body: { title } } = req
    console.log(idProject)

    try {
        updateProject(id, idProject, title)
            .then( project => 
                res.status(200).json({ project }))
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError)
                    status = 401
                
                const { message } = error

                res
                    .status(status)
                    .json({
                        error: message
                    })
            })
            
    } catch(error) {
        status = 400

        if (error instanceof TypeError || error instanceof ContentError)
            status = 406

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}