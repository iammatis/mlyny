const sgMail = require('@sendgrid/mail')
const _ = require('lodash')
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

    daily: matches => {
        const emails = []

        let msg
        let html
        _.forEach(matches, match => {
            html = templates.daily({
                type: match.owned.type,
                room: utils.getRoom(match.owned),
                matches: utils.concatenateRooms(match.matched),
                emails: utils.getEmails(match.matched)
            })

            msg = {
                // to: match.owned.owner.email,
                to: 'matej.vilk@gmail.com',
                from: 'matej.vilk@gmail.com',
                subject: msgs.daily.subject,
                html
            }

            emails.push(msg)
        })

        sgMail.send(emails)
    }
}
