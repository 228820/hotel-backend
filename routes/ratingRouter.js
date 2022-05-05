const express = require('express')
const router = express.Router()

const RatingController = require('../controllers/ratingController')

//  Get all rooms raitings
router.get('/ratings', RatingController.getAllRoomsRatings)
// Get all room raitings
router.get('/ratings/:id', RatingController.getRoomRatings)
// Add new rating
router.post('/ratings', RatingController.saveRoomRating)
// Update rating
router.put('/ratings/:id', RatingController.updateRoomRating)
// Delete rating
router.delete('/ratings/:id', RatingController.deleteRoomRating)

module.exports = router
