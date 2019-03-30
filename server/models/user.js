const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    notifications: {
        type: String,
        enum: ['daily', 'off'],
        default: 'daily',
        required: true
    },
    token: {
        type: String
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room'
    }
})

module.exports = mongoose.model('User', userSchema)
