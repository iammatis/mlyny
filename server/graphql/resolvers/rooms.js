const Room = require('../../models/room')
const User = require('../../models/user')

module.exports = {
    rooms: async () => {
        try {
            return await Room.find()
        } catch (err) {
            throw err
        }
    },

    createRoom: async args => {
        const owner = new User({
            email: args.userInput.email,
            notifications: args.userInput.notifications
        })

        try {
            const createdUser = await owner.save()

            const room = new Room({
                type: args.roomInput.type,
                want: args.roomInput.want,
                have: args.roomInput.have,
                owner: createdUser.id
            })

            const createdRoom = await room.save()
            await owner.updateOne({ room: createdRoom.id })

            return createdRoom
        } catch (err) {
            console.log(err)
            throw err
        }
    }
}
