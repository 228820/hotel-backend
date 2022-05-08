const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const controller = require('../controllers/administrationController')
const guard = require("./router-guard");

const baseRoute = 'administration'

router.use(`/${baseRoute}`, guard);

router.post(`/${baseRoute}/login`, controller.login.bind(controller))
router.get(`/${baseRoute}/test`, controller.test.bind(controller))

module.exports = router
