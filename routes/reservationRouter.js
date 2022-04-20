const express = require('express')
const router = express.Router()

const ReservationController = require('../controllers/reservationController')

// Get all reservations
router.get('/reservations', ReservationController.getAllReservations)
// Get one reservation
router.get('/reservations/:id', ReservationController.getReservation)
//  Add reservation
router.post('/reservations', ReservationController.saveReservation)
//  Update reservation
router.put('/reservations/:id', ReservationController.updateReservation)
//  Delete reservation
router.delete('/reservations/:id', ReservationController.deleteReservation)

module.exports = router
