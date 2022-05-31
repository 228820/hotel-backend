const express = require('express')
const { PORT } = require('./config')
const cors = require('cors')

// Routers
const roomRouter = require('./routes/roomRouter')
const reservationRouter = require('./routes/reservationRouter')
const administrationRouter = require('./routes/administrationRouter')
const roomFeaturesRouter = require('./routes/roomFeaturesRouter')
const ratingRouter = require('./routes/ratingRouter')
const userRouter = require('./routes/userRouter')

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
app.use('/', ratingRouter)
app.use('/', userRouter)

// get config vars
dotenv.config();

//  server
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}...`)
})

// temp add first user
const pg = require('./db/pg');
const bcrypt = require('bcrypt');

const createDefaultUser = async() => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const pass = bcrypt.hashSync('admin', salt);
        const result = await pg.query(`
            INSERT INTO users (user_id,login,password,first_name,last_name,email)
            VALUES (1,'admin', $1, 'Jan', 'Nowak', 'nowak@testowy.pl')
            ON CONFLICT DO NOTHING;
        `, [pass]);

        if (result.rowCount) {
            console.log('Default user \'admin\' with password \'admin\' created.');
        }
    } catch (e) {
        console.error(e);
    }
};
createDefaultUser();
