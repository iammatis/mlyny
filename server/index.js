const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const graphqlHttp = require('express-graphql')
const cron = require('node-cron')

const config = require('./config')
const graphqlSchema = require('./graphql/schema')
const graphqlResolvers = require('./graphql/resolvers')
const jobs = require('./utils/cron')

const app = express()

app.use(bodyParser.json())

app.use(
    '/graphql',
    graphqlHttp({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true
    })
)

cron.schedule('* * * * *', () => {
    console.log('running a task every minute')
    jobs.daily()
})

mongoose
    .connect(
        `mongodb://${config.db.user}:${config.db.pass}@${config.db.host}:${
            config.db.port
        }/${config.db.database}`,
        { useNewUrlParser: true }
    )
    .then(() => {
        console.log('Server is listenting on port: 8000')
        app.listen(8000)
    })
    .catch(err => {
        console.log(err)
    })
