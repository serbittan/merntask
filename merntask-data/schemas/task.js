const { Schema, Types: { ObjectId } } = require("mongoose")


const task = new Schema({
    name: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    project: {
        type: ObjectId,
        ref: 'Project'
    }
})

module.exports = task