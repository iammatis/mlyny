const _ = require('lodash')
const roomService = require('../services/room')
const mailService = require('../services/mail')

const matchSwap = (room1, room2) => {
    const { want: want1, have: have1 } = room1
    const { want: want2, have: have2 } = room2

    return (
        ((want1.building === have2.building &&
            want2.building === have1.building) ||
            (want1.building === '' && want2.building === '')) &&
        ((want1.block === have2.block && want2.block === have1.block) ||
            (want1.block === '' && want2.block === '')) &&
        ((want1.room === have2.room && want2.room === have1.room) ||
            (want1.room === 0 && want2.room === 0))
    )
}

const match = (room1, room2) => {
    const want = room1.type === 'WANT' ? room1.want : room2.want
    const have = room1.type === 'HAVE' ? room1.have : room2.have

    return (
        (want.building === have.building || !want.building) &&
        (want.block === have.block || !want.block) &&
        (want.room === have.room || !want.room)
    )
}

const areWantAndHaveRooms = (room1, room2) =>
    (room1.type === 'HAVE' && room2.type === 'WANT') ||
    (room1.type === 'WANT' && room2.type === 'HAVE')

const areSwapRooms = (room1, room2) =>
    room1.type === 'SWAP' && room2.type === 'SWAP'

module.exports = {
    daily: async () => {
        const rooms = await roomService.findDetailed()

        const matches = {}
        _.forEach(rooms, owned => {
            _.forEach(rooms, matched => {
                if (
                    owned.id !== matched.id &&
                    ((areSwapRooms(owned, matched) &&
                        matchSwap(owned, matched)) ||
                        (areWantAndHaveRooms(owned, matched) &&
                            match(owned, matched))) &&
                    (matched.notifications == null ||
                        !_.includes(matched.notifications.matched, owned.id))
                ) {
                    matches[owned.id] = matches[owned.id]
                        ? {
                              owned,
                              matched: matches[owned.id].matched.push(matched)
                          }
                        : { owned, matched: [matched] }
                }
            })
        })

        mailService.daily(matches)

        // console.log(matches)
    }
}
