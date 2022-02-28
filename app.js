const express = require('express')
const app = express()
const fs = require('fs')
require('dotenv/config')



// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)



// const msg = {
//     to: 'petemlowe@gmail.com', // Change to your recipient
//     from: 'plowe03@student.bbk.ac.uk', // Change to your verified sender
//     subject: 'Welcome to MiniBid',
//     text: 'This is pete test email',
//     html: `<form action="http://localhost:3000/api/users/login" method="POST">
//     <button>Submit</button>
// </form>`
//   }

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
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

const bidRoute = require('./routes/bid')
app.use('/api/bid', bidRoute)

const auth = require('./verifyToken')

app.get('/', (req,res)=>{
    res.send('Welcome to MiniBid')
    
})


mongoose.connect(process.env.DB_CONNECTOR, ()=>{
    console.log('Your mongoDB connector is on...')
})


app.listen(3000, ()=>{
    console.log('Your server is up and running...')
})