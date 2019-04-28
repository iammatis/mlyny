const mailService = require('../../services/mail')
const roomService = require('../../services/room')
const userService = require('../../services/user')
const config = require('../../config')

module.exports = {
    rooms: async () => {
        try {
            return await roomService.find()
        } catch (err) {
            throw err
        }
    },

    roomsComplete: async () => {
        try {
            return await roomService.findDetailed()
        } catch (err) {
            throw err
        }
    },

    createRoom: async args => {
        try {
            const owner = await userService.createAndSave(args)
            const room = await roomService.createAndSave(args, owner.id)
            await owner.updateOne({ room: room.id })

            // TODO: to email adress
            mailService.welcome({
                to: 'matej.vilk@gmail.com',
                from: config.mail.from,
                type: room.type,
                want: room.want,
                have: room.have,
                token: room.token
            })

            return room
        } catch (err) {
            console.log(err)
            throw err
        }
    },

    showRoom: async args => {
        try {
            const room = await roomService.findOne({ token: args.token })
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
            const room = await roomService.findOneAndDelete({
                token: args.token
            })
            if (room === null) {
                throw new Error('There is no room with such token!')
            }

            await userService.findOneAndDelete({ room: room.id })

            return room
        } catch (err) {
            throw err
        }
    }
}
