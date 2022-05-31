const express = require('express')
const router = express.Router()

/*

    HERE WE NEED GUARD FOR ADMIN ACCOUNT

    I ALREADY ADD ROLE FIELD IN DB

*/


const UserController = require('../controllers/userController')

//  GET /users
router.get('/users', UserController.getAllUsers)

//  GET /users/:id
router.get('/users/:id', UserController.getUser)

//  POST /users
router.post('/users', UserController.addUser)

//  PUT /users/:id
router.put('/users/:id', UserController.updateUser)

//  DELETE /users/:id
router.delete('/users/:id', UserController.removeUser)

module.exports = router
