const { createProject } = require("../../logic")
const  { NotAllowedError, TypeError, ContentError } = require('merntask-errors')


module.exports = (req, res) => {
    const { payload: { sub: id }, body: { name } } = req

    console.log(req.payload)
    console.log(req.body)
    try {
        createProject(name, id)
            .then(() => {
                res.status(201).end()
            })
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError)
                    status = 409

                const { message } = error

                res
                    .status(status)
                    .json({
                        error: message
                    })
            })

    } catch (error) {
        let status = 400

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


                
                



