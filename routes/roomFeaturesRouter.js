const express = require('express')
const router = express.Router()

const RoomFeaturesController = require('../controllers/roomFeaturesController')
const guard = require("./router-guard");

// Get all rooms features
router.get('/features', RoomFeaturesController.getAllRoomsFeatures) 
// Get one room features
router.get('/features/:id', RoomFeaturesController.getRoomFeatures)
// Add romm features
router.post('/features', guard, RoomFeaturesController.saveRoomFeatures)
// Update room features
router.put('/features/:id', guard, RoomFeaturesController.updateRoomFeatures)
// Set room features
router.patch('/features/:id', guard, RoomFeaturesController.setRoomFeatures)
// Delete room features
router.delete('/features/:id', guard, RoomFeaturesController.deleteRoomFeatures)

module.exports = router
