const express = require('express')
const app = express()
const fs = require('fs')
require('dotenv/config')

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger/swagger_output.json')
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const authRoute = require('./routes/auth')
app.use('/api/users', authRoute)

const itemsRoute = require('./routes/items')
app.use('/api/items', itemsRoute)

const usersRoute = require('./routes/users')
app.use('/api/users', usersRoute)

const auctionsRoute = require('./routes/auctions')
app.use('/api/auctions', auctionsRoute)

const auth = require('./helper/verifyToken')

mongoose.connect(process.env.DB_CONNECTOR, () => {
    console.log('Your mongoDB connector is on...')
})


app.listen(3000, () => {
    console.log('Your server is up and running...')
})