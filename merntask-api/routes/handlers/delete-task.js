const { deleteTask } = require("../../logic")
const { NotAllowedError, TypeError, ContentError } = require("merntask-errors")



module.exports = (req, res) => {
    const { payload: { sub: id}, params: { idTask }, body: { project } } = req

    try {
        deleteTask(id, idTask, project)
            .then(() => res.status(200).end()
            )
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError)
                    status = 401 //unauthorized

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
            status = 406  // not acceptable

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}