const { Schema, Types: { ObjectId } } = require("mongoose")

const project = new Schema({
    title: {
        type: String,
        required: true
    },
    creator: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    created: {
        type: Date,
        required: true,
        default: Date.now()
    }

})

module.exports = project