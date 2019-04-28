const User = require('../models/user')

module.exports = {
    createAndSave: async args => {
        const owner = new User({
            email: args.userInput.email,
            notifications: args.userInput.notifications
        })

        const createdUser = await owner.save()
        return createdUser
    },

    findOneAndDelete: async args => User.findOneAndDelete(args)
}
