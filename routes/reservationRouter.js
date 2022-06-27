const express = require('express')
const router = express.Router()

const ReservationController = require('../controllers/reservationController')

// Get all reservations
router.get('/reservations', ReservationController.getAllReservations)
router.get('/reservations-details', ReservationController.getAllReservationsDetails)

// Get one reservation
router.get('/reservations/:id', ReservationController.getReservation)

//  Get reservation and client by reservation id
router.get('/reservations/:id/client', ReservationController.getAllReservationData)

//  Get one reservation by room id
router.get('/reservations/room/:id', ReservationController.getReservationByRoomId)

//  Get invoice of reservation by reservation id
router.get('/reservations/:id/invoice', ReservationController.getInvoice)

//  Add reservation
router.post('/reservations', ReservationController.saveReservation)

//  Update reservation
router.put('/reservations/:id', ReservationController.updateReservation)

//  Delete reservation
router.delete('/reservations/:id', ReservationController.deleteReservation)

module.exports = router
