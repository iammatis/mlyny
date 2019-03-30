const mongoose = require('mongoose')

const { Schema } = mongoose

const notificationSchema = new Schema({
    owned: {
        type: Schema.Types.ObjectId,
        ref: 'Room'
    },
    matched: {
        type: Schema.Types.ObjectId,
        ref: 'Room'
    }
})

module.exports = mongoose.model('Notification', notificationSchema)
