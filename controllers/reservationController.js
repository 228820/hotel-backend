const db = require('../db/pg')

class ReservationController {
    async getAllReservations(req, res) {

        //  Try to get all reservations
        try {
            const { rows } = await db.query('SELECT * FROM RESERVATIONS')
            return res.status(200).json({ rows })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }        
    }

    async getReservation(req, res) {
        //  Get reservation id from request
        const id = req.params.id
        if(!id) {
            return res.status(500).json({ message: 'Reservation id is missing!' })            
        }

        //  Try to get reservation of reservation_id == id
        try {
            const { rows } = await db.query('SELECT * FROM RESERVATIONS WHERE RESERVATION_ID = $1', [id])

            //  If empty rows
            if(!rows.length) {
                return res.status(404).json({ message: 'Not found reservation of given id!' })
            }
            
            return res.status(200).json({ rows })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    async getReservationByRoomId(req, res) {
        //  Get room id from request
        const id = req.params.id
        if(!id) {
            return res.status(500).json({ message: 'Room id is missing!' })            
        }

        //  Check if room of given id exists
        try {
            const { rows } = await db.query('SELECT * FROM ROOMS WHERE ROOM_ID = $1', [id])

            //  If empty rows
            if(!rows.length) {
                return res.status(404).json({ message: 'Not found room of given id!' })
            }
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }

        //  Try to get reservations of room_id == id
        try {
            const { rows } = await db.query('SELECT * FROM RESERVATIONS WHERE ROOM_ID = $1', [id])

            //  If empty rows
            if(!rows.length) {
                return res.status(404).json({ message: 'Not found reservations of given id!' })
            }
            
            return res.status(200).json({ rows })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    async saveReservation(req, res) {
        const { room_id, client_id, start_date, end_date} = req.body
        let { message, paid } = req.body

        //  If message or/and paid not given set a value to not save null values into db
        message === undefined ? message = '' : message
        paid === undefined ? paid = false : paid 

        //  Check if every params which is need exists
        if(!room_id || !client_id || !start_date || !end_date) {
            return res.status(400).json({ message: 'Some parameters are missing!' })
        }

        try {
            await db.query('INSERT INTO RESERVATIONS (ROOM_ID, CLIENT_ID, START_DATE, END_DATE, MESSAGE, PAID) VALUES ($1, $2, $3, $4, $5, $6)',
            [room_id, client_id, start_date, end_date, message, paid])

            return res.sendStatus(201)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    async updateReservation(req, res) {
        //  Get reservation id from request
        const id = req.params.id
        if(!id) {
            return res.status(500).json({ message: 'Incorrect reservation id!' })            
        }
                
        const { room_id, client_id, start_date, end_date} = req.body
        let { message, paid } = req.body

        //  If message or/and paid not given set a value to not save null values into db
        message === undefined ? message = '' : message
        paid === undefined ? paid = false : paid 

        //  Check if every params which is need exists
        if(!room_id || !client_id || !start_date || !end_date) {
            return res.status(400).json({ message: 'Some parameters are missing!' })
        }

        //  Try to update reservation of reservation_id == id
        try {
            await db.query('UPDATE RESERVATIONS SET ROOM_ID = $1, CLIENT_ID = $2, START_DATE = $3, END_DATE = $4, MESSAGE = $5, PAID = $6 WHERE RESERVATION_ID = $7',
            [room_id, client_id, start_date, end_date, message, paid, id])

            return res.sendStatus(202)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }

    }

    async deleteReservation(req, res) {
        //  Get reservation id from request
        const id = req.params.id
        if(!id) {
            return res.status(500).json({ message: 'Incorrect reservation id!' })            
        }

        //  Try to delete reservation of reservation_id == id
        try {
            await db.query('DELETE FROM RESERVATIONS WHERE RESERVATION_ID = $1', [id])

            return res.sendStatus(204)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }
}

module.exports = new ReservationController()