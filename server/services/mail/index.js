const sgMail = require('@sendgrid/mail')
const config = require('../../config')
const templates = require('./templates')
const utils = require('../../utils')

sgMail.setApiKey(config.mail.key)
const msgs = config.messages

module.exports = {
    welcome: args => {
        const html = templates.welcome({
            type: args.type,
            have: utils.concatenateRoom(args.have),
            want: utils.concatenateRoom(args.want)
        })

        const msg = {
            to: args.to,
            from: config.mail.from,
            subject: msgs.welcome.subject,
            html
        }

        sgMail.send(msg)
    },

    daily: args => {
        const emails = [
            {
                to: 'recipient1@example.org',
                from: 'sender@example.org',
                subject: 'Hello recipient 1',
                text: 'Hello plain world!',
                html: '<p>Hello HTML world!</p>'
            },
            {
                to: 'recipient2@example.org',
                from: 'other-sender@example.org',
                subject: 'Hello recipient 2',
                text: 'Hello other plain world!',
                html: '<p>Hello other HTML world!</p>'
            }
        ]
        sgMail.send(emails)
    }
}
