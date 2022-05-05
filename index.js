const express = require('express')
const { PORT } = require('./config')
const cors = require('cors')
const roomRouter = require('./routes/roomRouter')
const reservationRouter = require('./routes/reservationRouter')
const administrationRouter = require('./routes/administrationRouter')
const roomFeaturesRouter = require('./routes/roomFeaturesRotuer')
const app = express()
const dotenv = require('dotenv');

//db

//  parsers
app.use(express.json())

//  fix cors
app.use(cors())

//  routes
app.use('/', roomRouter)
app.use('/', reservationRouter)
app.use('/', administrationRouter)
app.use('/', roomFeaturesRouter)

// get config vars
dotenv.config();

//  server
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}...`)
})
