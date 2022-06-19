const express = require('express')
const router = express.Router()

const PaymentsController = require('../controllers/paymentsController')

//  GET /users
router.get('/checkout-session/:redirect/:room_id/:reservation_id', PaymentsController.getCheckoutSession)
router.get('/checkout_success', PaymentsController.onCheckoutSuccess)

module.exports = router
