const express = require('express')
const router = express.Router()

const RoomController = require('../controllers/roomController')

//  Get all rooms
router.get('/rooms', RoomController.getAllRooms)
//  Get all rooms raitings
router.get('/rooms/ratings',RoomController.getAllRoomsRatings)
//  Get one room
router.get('/rooms/:id', RoomController.getRoom)
//  Add new room
router.post('/rooms', RoomController.saveRoom)
//  Update room
router.put('/rooms/:id', RoomController.updateRoom)
//  Remove room
router.delete('/rooms/:id', RoomController.deleteRoom)

module.exports = router