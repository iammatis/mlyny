module.exports = {
    concatenateRoom: (room, separator = ' - ') => {
        let result = ''

        if (room.building) result += room.building
        if (room.block) result += separator + room.block
        if (room.room) result += separator + room.room

        return result
    }
}
