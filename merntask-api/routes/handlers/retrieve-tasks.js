const { retrieveTasks } = require("../../logic")
const { NotAllowedError, TypeError, ContentError, NotFoundError } = require("merntask-errors")


module.exports = (req, res) => { 
    const { payload: { sub: id }, body: { project }} = req

    try {
        retrieveTasks(id, project)
            .then(tasks => {
                res.status(200).json(tasks)
            })
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

        if (error instanceof TypeError || error instanceof ContentError || NotFoundError)
            status = 406 // not acceptable

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}