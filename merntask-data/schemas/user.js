const { Schema } = require("mongoose");

const user = new Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now()
    },
    authenticated: {
        type: Date
    },
    retrieved: {
        type: Date
    }
})

module.exports = user