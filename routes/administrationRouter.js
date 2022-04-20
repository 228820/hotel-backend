const express = require('express')
const router = express.Router()

const controller = require('../controllers/administrationController')

const baseRoute = 'administration'

router.post(`/${baseRoute}/login`, controller.login)

module.exports = router
