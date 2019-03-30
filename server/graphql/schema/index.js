const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type User {
        _id: ID!
        email: String!
    }

    type Room {
        _id: ID!
        type: Type!
        owner: User!
        token: String!
        want: RoomDetail
        have: RoomDetail
    }

    type RoomDetail {
        building: Building
        block: String
        room: Int
    }

    input RoomInput {
        type: Type!
        want: RoomDetailInput
        have: RoomDetailInput
    }

    input RoomDetailInput {
        building: Building
        block: String
        room: Int
    }

    input UserInput {
        email: String!
        notifications: String!
    }

    enum Type {
        WANT
        HAVE
        SWAP
    }

    enum Building {
        VB
        AD
        MI
    }

    type RootQuery {
        rooms: [Room!]!
        showRoom(token: String!): Room!
    }

    type RootMutation {
        createRoom(roomInput: RoomInput, userInput: UserInput): Room!
        deleteRoom(token: String!): Room!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)
