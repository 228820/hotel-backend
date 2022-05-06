const db = require('../db/pg')

class RatingController {
    async getAllRoomsRatings(req, res) {
        // Try to get all rooms ratings
        try {
            const { rows } = await db.query('SELECT * FROM RATINGS')
            return res.status(200).json({ rows })
        } catch (err) {
            return res.status(500).json({ message: err.message})
        }
    }

    async getRoomRatings(req, res) {
        //  Get room id from request
        const id = req.params.id
        if(!id) {
            return res.status(500).json({ message: 'Incorrect room id!' })            
        }

        // Try to get all room features
        try {
            const { rows } = await db.query('SELECT * FROM RATINGS WHERE ROOM_ID = $1', [id])
            return res.status(200).json({ rows })
        } catch (err) {
            return res.status(500).json({ message: err.message})
        }
    }

    async saveRoomRating(req, res) {
        const { room_id, rating } = req.body
        let { review } = req.body

        // If status id not given set a value to not to save null value into db
        review === undefined ? review = '' : review

        //  Check if every params which is need exists
        if(!room_id || !rating) {
            return res.status(400).json({ message: 'Some parameters are missing!' })
        }

        // Try to save rating
        try {
            await db.query('INSERT INTO RATINGS(ROOM_ID, RATING, REVIEW) VALUES($1, $2, $3)',
            [room_id, rating, review])

            return res.sendStatus(201)
        } catch (err) {
            return res.status(500).json({ message: err.message})            
        }
    }

    async updateRoomRating(req, res) {
        //  Get rating id from request
        const id = req.params.id
        if(!id) {
            return res.status(500).json({ message: 'Incorrect rating id!' })            
        }

        const { room_id, rating } = req.body
        let { review } = req.body

        // If status id not given set a value to not to save null value into db
        review === undefined ? review = '' : review

        //  Check if every params which is need exists
        if(!room_id || !rating) {
            return res.status(400).json({ message: 'Some parameters are missing!' })
        }

        // Try to update rating
        try {
            await db.query(`UPDATE RATINGS SET ROOM_ID = $1, RATING = $2, REVIEW = $3
            WHERE RATING_ID = $4`, [room_id, rating, review, id])

            return res.sendStatus(201)
        } catch (err) {
            return res.status(500).json({ message: err.message})            
        }        
    }

    async deleteRoomRating(req, res) {
        //  Get rating id from request
        const id = req.params.id
        if(!id) {
            return res.status(500).json({ message: 'Incorrect rating id!' })            
        }

        //  Try to delete rating of rating_id == id
        try {
            await db.query('DELETE FROM RATINGS WHERE RATING_ID = $1', [id])

            return res.sendStatus(204)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }                
    }
}

module.exports = new RatingController
