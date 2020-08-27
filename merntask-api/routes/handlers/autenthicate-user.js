const { authenticateUser } = require('../../logic')
const { NotAllowedError, TypeError, ContentError } = require('merntask-errors')
const jwt = require('jsonwebtoken')
const { env: { JWT_SECRET, JWT_EXP} } = process


module.exports = (req, res) => {
    const { body: { email , password } } = req

    try {
        authenticateUser(email, password)
            .then(id => {
                const token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: JWT_EXP })

                res.status(200).json({ token })
            })
            .catch(error => {
                let status = 400
                
                if (error instanceof NotAllowedError)
                    status = 401  // not authorized

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
            status = 406 // not acceptable
        
        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }

}

