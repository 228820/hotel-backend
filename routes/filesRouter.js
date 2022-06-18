const express =require('express')
const router = express.Router()
const filesController = require('../controllers/filesController')

router.get('/files/:path', filesController.getFile)

module.exports = router