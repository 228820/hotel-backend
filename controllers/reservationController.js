const db = require('../db/pg')
const invoice = require('../utils/invoice-manager')
const path = require('path')
const fs = require('fs')

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

    async getAllReservationsDetails(req, res) {

        //  Try to get all reservations
        try {
            const { rows } = await db.query(`
                SELECT r.*, c.*, rm.* FROM RESERVATIONS r 
                JOIN CLIENTS c ON r.client_id = c.client_id
                JOIN ROOMS rm ON r.room_id = rm.room_id
                ORDER BY r.reservation_id DESC
            `)
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
            const { rows } = await db.query(`
                SELECT r.*, c.*, rm.* FROM RESERVATIONS r 
                JOIN CLIENTS c ON r.client_id = c.client_id
                JOIN ROOMS rm ON r.room_id = rm.room_id
                WHERE r.reservation_id = $1
            `, [id])

            //  If empty rows
            if(!rows.length) {
                return res.status(404).json({ message: 'Not found reservation of given id!' })
            }
            
            return res.status(200).json({ rows })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    async getAllReservationData(req, res) {
        //  Get reservation id from request
        const id = req.params.id
        if(!id) {
            return res.status(500).json({ message: 'Reservation id is missing!' })            
        }

        //  Try to get reservation of reservation_id == id
        try {
            const { rows } = await db.query(`SELECT * FROM RESERVATIONS INNER JOIN CLIENTS
            ON RESERVATIONS.CLIENT_ID = CLIENTS.CLIENT_ID
            INNER JOIN ROOMS
            ON RESERVATIONS.ROOM_ID = ROOMS.ROOM_ID
            WHERE RESERVATION_ID = $1`, [id])

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

    async getInvoice(req, res) {
        //  Get reservation id from request
        const id = req.params.id
        if(!id) {
            return res.status(500).json({ message: 'Reservation id is missing!' })            
        }

        //  Generate path for invoice
        const dir = path.join(__dirname, '..', 'data')
        const pathForInvoice = path.join(dir + `/invoice_${id}.pdf`)

        //  Check if invoice exists
        if (fs.existsSync(pathForInvoice)) {
            return res.status(200).download(pathForInvoice)
        }

        try {
            console.log('---------      INVOICE     ----------')

            //  Check if everything is oK
            invoice.checkIfDirectoryAndTemplateExist()
            
            await invoice.startGeneratingInvoice(id)
            
            //  Something doesnt work with async await so i nedd do this tricky thing
            setTimeout(() => {
                console.log('--------------------------------------------')        
                return res.status(200).download(pathForInvoice)
            }, 2000)
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
            //  Try to add reservation to db
            const { rows } = await db.query(`INSERT INTO RESERVATIONS (ROOM_ID, CLIENT_ID, START_DATE, END_DATE, MESSAGE, PAID)
                            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                            [room_id, client_id, start_date, end_date, message, paid])

            return res.status(201).json({ rows })
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
                
        const { start_date, end_date} = req.body
        let { message } = req.body

        //  If message or/and paid not given set a value to not save null values into db
        message === undefined ? message = '' : message

        //  Check if every params which is need exists
        if(!start_date || !end_date) {
            return res.status(400).json({ message: 'Some parameters are missing!' })
        }

        //  Try to update reservation of reservation_id == id
        try {
            await db.query('UPDATE RESERVATIONS SET START_DATE = $1, END_DATE = $2, MESSAGE = $3 WHERE RESERVATION_ID = $4',
            [start_date, end_date, message, id])

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
            await db.query(`DELETE FROM PAYMENTS WHERE reservation_id = $1;`, [id])
            await db.query(`DELETE FROM RESERVATIONS WHERE reservation_id = $1;`, [id])

            return res.sendStatus(204)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }
}

module.exports = new ReservationController()