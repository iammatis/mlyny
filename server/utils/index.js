/* eslint-disable no-multi-assign */
const _ = require('lodash')

const self = (module.exports = {
    concatenateRoom: (room, separator = ' - ') => {
        let result = ''

        if (room.building) result += room.building
        if (room.block) result += separator + room.block
        if (room.room) result += separator + room.room

        return result
    },

    getRoom: (room, separator = ' - ') => {
        if (room.type === 'HAVE')
            return self.concatenateRoom(room.have, separator)
        if (room.type === 'WANT')
            return self.concatenateRoom(room.want, separator)
        return ''
    },

    concatenateRooms: (rooms, separator = ' - ') => {
        const result = []
        _.forEach(rooms, room => {
            if (room.type === 'HAVE')
                result.push(self.concatenateRoom(room.have, separator))
            else if (room.type === 'WANT')
                result.push(self.concatenateRoom(room.want, separator))
        })
        // console.log(result)
        return result
    },

    getEmails: rooms => {
        const result = []
        _.forEach(rooms, room => {
            result.push(room.owner.email)
        })
        // console.log(result)
        return result
    }
})
