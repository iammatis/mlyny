const crypto = require('crypto')
const Room = require('../../models/room')
const User = require('../../models/user')
require('../../models/notification') // Neded for graphql schema
const mailService = require('../../services/mail')
const config = require('../../config')

module.exports = {
    rooms: async () => {
        try {
            return await Room.find().populate('owner')
        } catch (err) {
            throw err
        }
    },

    roomsComplete: async () => {
        try {
            return await Room.find()
                .populate('owner')
                .populate('notifications')
        } catch (err) {
            throw err
        }
    },

    createRoom: async args => {
        try {
            const owner = new User({
                email: args.userInput.email,
                notifications: args.userInput.notifications
            })

            const createdUser = await owner.save()

            const room = new Room({
                type: args.roomInput.type,
                want: args.roomInput.want,
                have: args.roomInput.have,
                token: crypto.randomBytes(64).toString('hex'),
                owner: createdUser.id
            })

            const createdRoom = await room.save()
            await owner.updateOne({ room: createdRoom.id })

            // TODO: to email adress
            mailService.welcome({
                to: 'matej.vilk@gmail.com',
                from: config.mail.from,
                type: room.type,
                want: room.want,
                have: room.have,
                token: room.token
            })

            return createdRoom
        } catch (err) {
            console.log(err)
            throw err
        }
    },

    showRoom: async args => {
        try {
            const room = await Room.findOne({ token: args.token })
            if (room === null) {
                throw new Error('There is no room with such token!')
            }
            return room
        } catch (err) {
            throw err
        }
    },

    deleteRoom: async args => {
        try {
            const room = await Room.findOneAndDelete({ token: args.token })
            if (room === null) {
                throw new Error('There is no room with such token!')
            }

            await User.findOneAndDelete({ room: room.id })

            return room
        } catch (err) {
            throw err
        }
    }
}
