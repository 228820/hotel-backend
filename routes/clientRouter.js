const express =require('express')
const router = express.Router()
const clientController = require('../controllers/clientController')

//  GET all clients
router.get('/clients', clientController.getAllClients)

//  GET one client
router.get('/clients/:id', clientController.getClientById)

//  POST client
router.post('/clients', clientController.saveClient)

//  PUT client
router.put('/clients/:id', clientController.updateClient)

//  DELETE client
router.delete('/clients/:id', clientController.deleteClient)

module.exports = router
