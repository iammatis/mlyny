const ejs = require('ejs')
const fs = require('fs')
const config = require('../../../config')

const msgs = config.messages

module.exports = {
    welcome: context => {
        const compiled = ejs.compile(
            fs.readFileSync(`${__dirname}/welcome.ejs`, 'utf8')
        )
        return compiled({ ...msgs.welcome, ...context })
    },

    daily: context => {
        const compiled = ejs.compile(
            fs.readFileSync(`${__dirname}/daily.ejs`, 'utf8')
        )
        return compiled({ ...msgs.daily, ...context })
    }
}
