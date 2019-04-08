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
            enum: ['VB', 'AD', 'MI'],
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
    token: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

roomSchema.virtual('notifications', {
    ref: 'Notification',
    localField: '_id',
    foreignField: 'owns',
    justOne: true
})

roomSchema.set('toObject', { virtuals: true })
roomSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Room', roomSchema)
