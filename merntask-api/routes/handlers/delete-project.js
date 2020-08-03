const { deleteProject } = require('../../logic')
const { TypeError, ContentError } = require('merntask-errors')

module.exports = (req, res) => {
    const { payload: { sub: id }, params: { idProject }  } = req
    
    try {
        deleteProject(id, idProject)
            .then(() => 
                res.status(200).end()
            )
            .catch(error => {
                let status = 400

                if (error instanceof NotFoundError)
                    status = 404

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