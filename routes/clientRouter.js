const express =require('express')
const router = express.Router()
const clientController = require('../controllers/clientController')

//  GET all clients
router.get('/clients', clientController.getAllClients)

//  GET one client
router.get('/clients', clientController.getClientById)

//  POST client
router.post('/clients', clientController.saveClient)

//  PUT client
router.put('/clients', clientController.updateClient)

//  DELETE client
router.delete('/clients', clientController.deleteClient)

module.exports = router
