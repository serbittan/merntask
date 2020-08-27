const { registerUser } = require('../../logic')
const { NotAllowedError, TypeError, ContentError } = require('merntask-errors')

module.exports = (req, res) => {
    const { body: { name, email, password } } = req

    try{
        registerUser(name, email, password)
            .then(() => res.status(201).end())
            .catch(error => {
                let status = 400
                
                if (error instanceof NotAllowedError)
                    status = 409 // Conflict

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
            status = 406  // not acceptable
        
        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}