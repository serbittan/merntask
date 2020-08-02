const { retrieveProjects } = require("../../logic")
const { NotAllowedError, ContentError } = require("merntask-errors")

module.exports = (req, res) => {
    const { payload: { sub: id} } = req
    console.log(req.payload)
    console.log(req.params)
    try {
        retrieveProjects(id)
            .then(project => {
                res.status(200).json(project)
            })
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError)
                    status = 401  // not allowed

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