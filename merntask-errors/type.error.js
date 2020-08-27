module.exports = class TypeError extends Error {
    constructor(...args) {
        super(...args)

        this.name  = TypeError.name
    }

}