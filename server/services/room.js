const crypto = require('crypto')
const Room = require('../models/room')
require('../models/notification') // Neded for graphql schema

module.exports = {
    createAndSave: async (args, userId) => {
        const room = new Room({
            type: args.roomInput.type,
            want: args.roomInput.want,
            have: args.roomInput.have,
            token: crypto.randomBytes(64).toString('hex'),
            owner: userId
        })

        return room.save()
    },

    find: async () => Room.find().populate('owner'),

    findDetailed: async () =>
        Room.find()
            .populate('owner')
            .populate('notifications'),

    findOne: async args => Room.findOne(args),

    findOneAndDelete: async args => Room.findOneAndDelete(args)
}
