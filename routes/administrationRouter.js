const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const controller = require('../controllers/administrationController')

const baseRoute = 'administration'


router.use(`/${baseRoute}`, (req, res, next) => {
    if (req.path === '/login') {
        next();
        return;
    }

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }

        req.user = user

        next()
    })
})


router.post(`/${baseRoute}/login`, controller.login.bind(controller))
router.get(`/${baseRoute}/test`, controller.test.bind(controller))

module.exports = router
