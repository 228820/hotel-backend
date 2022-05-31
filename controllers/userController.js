const db = require('../db/pg')
const bcrypt = require('bcrypt')

class UserController {
    async getAllUsers(req, res) {
        try {
            //  Try to get users
            const { rows } = await db.query('SELECT * FROM USERS')
            
            //  Check if there are any users
            if(!rows) {
                return res.status(404).json({ message: 'There are no users to display! '})
            }

            return res.status(200).json({ rows })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    async getUser(req, res) {
        try {
            //  Get room id from request
            const id = req.params.id
            if(!id) {
                return res.status(500).json({ message: 'Incorrect user id!' })            
            }

            //  Try to get user of user_id == id
            const { rows } = await db.query('SELECT * FROM USERS WHERE USER_ID = $1', [id])

            //  Check if user exists
            if(!rows) {
                return res.status(404).json({ message: `User of id: ${id} doesn't exist!` })
            }
            
            return res.status(200).json({ rows })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    async addUser(req, res) {
        try {
            const { email, login, password, first_name, last_name } = req.body
            let { is_admin } = req.body

            //  Check if every params which is need exists
            if(!email || !login || !password || !first_name || !last_name) {
                return res.status(400).json({ message: 'Some parameters are missing!' })
            }

            is_admin === undefined ? is_admin = false : is_admin
            
            //  Check if user exist already
            const { rows } = await db.query('SELECT * FROM USERS WHERE EMAIL = $1', [email])
            if(rows.length) {
                return res.status(400).json({ message: 'User already exist!' })
            }
    
            //  Generate hashed password
            const hashedPassword = await bcrypt.hash(password, 10)
    
            //  Save user
            await db.query(`INSERT INTO USERS
                            (email, login, password, first_name, last_name, is_admin)
                            VALUES($1, $2, $3, $4, $5, $6)`,
                            [email, login, hashedPassword, first_name, last_name, is_admin])

            return res.status(201).json({ message: 'User create successfully!' })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    async updateUser(req, res) {
        try {
            //  Get user id from request
            const id = req.params.id
            if(!id) {
                return res.status(500).json({ message: 'Incorrect user id!' })            
            }

            //  Try to get user of user_id == id
            const { rows } = await db.query('SELECT * FROM USERS WHERE USER_ID = $1', [id])

            //  Check if user exists
            if(!rows.length) {
                return res.status(404).json({ message: `User of id: ${id} doesn't exist!` })
            }

            let { email, login, password, first_name, last_name, is_admin } = req.body

            //  Check if one or more parameters are given
            if(!email && !login && !password && !first_name && !last_name && !is_admin) {
                return res.status(400).json({ message: 'No parameters given!' })
            }

            //  If parameter doesn't exist get parameter from db
            email === undefined ? email = rows[0].email : email
            login === undefined ? login = rows[0].login : login
            first_name === undefined ? first_name = rows[0].first_name : first_name
            last_name === undefined ? last_name = rows[0].last_name : last_name
            is_admin === undefined ? is_admin = rows[0].is_admin : is_admin

            //  If password is given generate hashed password
            password === undefined ? password = rows[0].password : password = await bcrypt.hash(password, 10)
            
            //  Update user in db
            await db.query(`UPDATE USERS
                            SET EMAIL = $1, LOGIN = $2, PASSWORD = $3,
                            FIRST_NAME = $4, LAST_NAME = $5, IS_ADMIN = $6
                            WHERE USER_ID = $7`,
            [email, login, password, first_name, last_name, is_admin, id])

            return res.status(201).json({ message: 'User update successfully!' })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    async removeUser(req, res) {
        try {
            //  Get user id from request
            const id = req.params.id
            if(!id) {
                return res.status(500).json({ message: 'Incorrect user id!' })            
            }

            //  Try to get user of user_id == id
            const { rows } = await db.query('SELECT * FROM USERS WHERE USER_ID = $1', [id])

            //  Check if user exists
            if(!rows.length) {
                return res.status(404).json({ message: `User of id: ${id} doesn't exist!` })
            }

            //  Delete user
            await db.query('DELETE FROM USERS WHERE USER_ID = $1', [id])
            
            return res.sendStatus(204)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }
}

module.exports = new UserController()
