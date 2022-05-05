const express = require('express')
const router = express.Router()

const RoomFeaturesController = require('../controllers/roomFeaturesController')

// Get all rooms features
router.get('/features', RoomFeaturesController.getAllRoomsFeatures) 
// Get one room features
router.get('/features/:id', RoomFeaturesController.getRoomFeatures)
// Add romm features
router.post('/features', RoomFeaturesController.saveRoomFeatures)
// Update room features
router.put('/features/:id', RoomFeaturesController.updateRoomFeatures)
// Delete room features
router.delete('/features/:id', RoomFeaturesController.deleteRoomFeatures)

module.exports = router
