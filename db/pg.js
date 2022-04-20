const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hotel_database',
    password: 'admin',
    port: 5491,
  })

module.exports = {
  query: (text, params) => pool.query(text, params),
}
