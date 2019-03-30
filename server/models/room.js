const mongoose = require('mongoose')

const { Schema } = mongoose

const roomSchema = new Schema({
    type: {
        type: String,
        enum: ['WANT', 'HAVE', 'SWAP'],
        default: 'WANT',
        required: true
    },
    want: {
        building: {
            type: String,
            enum: ['VB', 'AD', 'MI']
        },
        block: {
            type: String
        },
        room: {
            type: Number
        }
    },
    have: {
        building: {
            type: String,
            enum: ['vb', 'ad', 'mi'],
            required() {
                return this.type === 'HAVE'
            }
        },
        block: {
            type: String,
            required() {
                return this.type === 'HAVE'
            }
        },
        room: {
            type: Number,
            required() {
                return this.type === 'HAVE'
            }
        }
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    notifications: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Notification'
        }
    ]
})

module.exports = mongoose.model('Room', roomSchema)
