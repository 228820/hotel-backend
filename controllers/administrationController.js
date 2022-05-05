const db = require('../db/pg')
const bcrypt = require('bcrypt')
const bcryptSalt = bcrypt.genSaltSync(10)
const jwt = require('jsonwebtoken')

const tUsers = 'users';

class AdministrationController {
    async login(req, res) {
        try {
            const incorrectCredentialsMessage = 'Incorrect email, login or password.';
            const { loginOrEmail, password } = req.body

            if (!loginOrEmail || !password) {
                return res.status(401).json({ message: incorrectCredentialsMessage })
            }

            const { rows } = await db.query(
                `SELECT user_id, email, first_name, last_name, login, password 
                FROM ${tUsers}
                WHERE login = $1 OR email = $1
                LIMIT 1;`,
                [loginOrEmail]
            )

            if (!rows || rows.length <= 0) {
                return res.status(401).json({ message: incorrectCredentialsMessage })
            }

            const user = rows[0];

            const validPassword = await bcrypt.compare(password, user.password);

            if (validPassword) {
                delete user.password
                delete user.user_id

                const token = this.generateAccessToken(user);
                return res.status(200).json({
                    ...user,
                    token: token
                })
            } else {
                return res.status(401).json({ message: incorrectCredentialsMessage })
            }
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    async test(req, res){
        return res.status(200).json(req.user);
    }

    generateAccessToken(user) {
        return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
    }
}

module.exports = new AdministrationController()
