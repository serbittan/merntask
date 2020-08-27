const { updateTask } = require("../../logic")
const { NotAllowedError, TypeError, ContentError } = require('merntask-errors')



module.exports = (req, res) => {
    const { payload: { sub: id}, params: { idTask, project }, body } = req

    try {
        updateTask(id, idTask, project, body)
            .then(task => res.status(200).json(task)
            )
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError)
                    status = 401 // unauthorized
                    
                    const { message } = error
                
                    res
                        .status(status)
                        .json({
                            error: message
                        })
            })
    } catch (error) {
        status = 400

        if (error instanceof TypeError || error instanceof ContentError)
            status = 406 // not acceptable

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}