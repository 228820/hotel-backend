const express = require('express')
const { PORT } = require('./config')
const cors = require('cors')
const roomRouter = require('./routes/roomRouter')
const reservationRouter = require('./routes/reservationRouter')
const app = express()

//db

//  parsers
app.use(express.json())

//  fix cors
app.use(cors())

//  routes
app.use('/', roomRouter)
app.use('/', reservationRouter)

//  server
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}...`)
})