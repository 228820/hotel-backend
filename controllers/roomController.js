const db = require('../db/pg')

class RoomController {
    getAllRooms(req, res) {
        res.status(200).json({ message: 'Info about all rooms'})
    }

    getRoom(req, res) {
        res.status(200).json({ message: 'Info about one room'})
    }

    saveRoom(req, res) {
        res.status(200).json({ message: 'Add new room to database'})    
    }

    updateRoom(req, res) {
        res.status(200).json({ message: 'Update info about room'})
    }

    deleteRoom(req,res) {
        res.status(200).json({ message: 'Delete room'})
    }
}

module.exports = new RoomController()