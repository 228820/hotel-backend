class ReservationController {
    getAllReservations(req, res) {
        res.status(200).json({ message: 'All reservations'})
    }

    getReservation(req, res) {
        res.status(200).json({ message: 'One reservation'})
    }

    saveReservation(req, res) {
        res.status(200).json({ message: 'Add reservation'})
    }

    updateReservation(req, res) {
        res.status(200).json({ message: 'Update reservation'})
    }

    deleteReservation(req, res) {
        res.status(200).json({ message: 'Delete reservation'})
    }
}

module.exports = new ReservationController()