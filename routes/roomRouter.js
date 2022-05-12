const express = require('express')
const router = express.Router()

const RoomController = require('../controllers/roomController')
const guard = require("./router-guard");

//  Get all rooms
router.get('/rooms', RoomController.getAllRooms)
//  Get one room
router.get('/rooms/:id', RoomController.getRoom)
//  Add new room
router.post('/rooms', guard, RoomController.saveRoom)
//  Update room
router.put('/rooms/:id', guard, RoomController.updateRoom)
//  Remove room
router.delete('/rooms/:id', guard, RoomController.deleteRoom)

module.exports = router
