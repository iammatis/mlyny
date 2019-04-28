const ini = require('ini')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const messagesPath = path.join(__dirname, './messages.ini')
const messages = ini.parse(fs.readFileSync(messagesPath, 'utf-8'))

module.exports = {
    env: process.env.NODE_ENV || 'dev',
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS
    },
    mail: {
        key: process.env.SENDGRID_API_KEY,
        from: process.env.MAIL_FROM
    },
    messages
}
