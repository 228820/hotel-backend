const db = require('../db/pg')

let room = {
    room_id: null,
    img_link: null,
    title: null,
    sleeps: null,
    floor: null,
    price: null,
    description: null,
    extended_description: null,
    is_parking: null,
    is_wifi: null,
    animal_allow: null,
    count_of_ratings: null,
    rating: null,
    review: null
}

class RoomController {
    async getAllRooms(req, res) {
        // Try to get all rooms
        try {
            const { rows } = await db.query('SELECT * FROM ROOMS')
            return res.status(200).json({ rows })
        } catch (err) {
            return res.status(500).json({ message: err.message})
        }
    }

    async getAllRoomsRatings(req, res) {
        //  Try to get count of raitings and average of ratnigs for ech room
        try {
            const { rows } = await db.query('SELECT ROOM_ID, COUNT(RATING), AVG(RATING) FROM RATINGS GROUP BY ROOM_ID')            
            return res.status(200).json({ rows })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

    async getRoom(req, res) {
        //  Get room id from request
        const id = req.params.id
        if(!id) {
            return res.status(500).json({ message: 'Incorrect room id!' })            
        }

        // Try to get one room of room_id == id
        try {
            const { rows } = await db.query('SELECT * FROM ROOMS WHERE ROOM_ID = $1', [id])
            return res.status(200).json({ rows })
        } catch (err) {
            return res.status(500).json({ message: err.message})
        }        
    }

    async getRoomFeatures(req, res) {
        //  Get room id from request
        const id = req.params.id
        if(!id) {
            return res.status(500).json({ message: 'Incorrect room id!' })            
        }

        // Try to get all rooms features
        try {
            const { rows } = await db.query(`select room_id, 
                                                case (select status from room_features where room_features.room_id = $1 and type = 'is_wifi')
                                                when true then true
                                                when false then false
                                                end is_wifi,
                                                
                                                case (select status from room_features where room_features.room_id = $1 and type = 'is_parking')
                                                when true then true
                                                when false then false
                                                end is_parking,
                                                
                                                case (select status from room_features where room_features.room_id = $1 and type = 'animal_allow')
                                                when true then true
                                                when false then false
                                                end animal_allow
                                            from room_features
                                            where room_id = $1
                                            group by room_id`, [id])
            return res.status(200).json({ rows })
        } catch (err) {
            return res.status(500).json({ message: err.message})
        }
    }

    async saveRoom(req, res) {
        const { title, sleeps, floor, price, description, extended_description } = req.body
        let { img_link } = req.body

        // If img_link is not given set a valu to not to save null value into db
        img_link === undefined ? img_link = '' : img_link

        //  Check if every params which is need exists
        if(!title || !sleeps || !floor || !price || !description || !extended_description) {
            return res.status(400).json({ message: 'Some parameters are missing!' })
        }

        // Try to save room
        try {
            await db.query(`INSERT INTO ROOMS(IMG_LINK, TITLE, FLOOR, PRICE, DESCRIPTION, EXTENDED_DESCRIPTION)
            VALUES($1, $2, $3, $4, $5, $6)`,
            [img_link, title, sleeps, floor, price, description, extended_description])

            return res.sendStatus(201)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    async updateRoom(req, res) {
        const { title, sleeps, floor, price, description, extended_description } = req.body
        let { img_link } = req.body

        // If img_link is not given set a valu to not to save null value into db
        img_link === undefined ? img_link = '' : img_link

        //  Check if every params which is need exists
        if(!title || !sleeps || !floor || !price || !description || !extended_description) {
            return res.status(400).json({ message: 'Some parameters are missing!' })
        }

        // Try to update room of room_id = id
        try {
            await db.query(`UPDATE ROOMS SET IMG_LINK = $1, TITLE = $2, SLEEPS = $3,
            FLOOR = $4, PRICE = $5, DESCRIPTION = $6, EXTENDED_DESCRIPTION = $7
            WHERE ROOM_ID = $7`,
            [img_link, title, sleeps, floor, price, description, extended_description, id])
            return res.sendStatus(202)
        } catch (err) {
            return res.status(500).json({ message: err.message })            
        }
    }

    async deleteRoom(req,res) {
        //  Get room id from request
        const id = req.params.id
        if(!id) {
            return res.status(500).json({ message: 'Incorrect room id!' })            
        }

        //  Try to delete room of room_id == id
        try {
            await db.query('DELETE FROM ROOMS WHERE ROOM_ID = $1', [id])

            return res.sendStatus(204)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }
}

module.exports = new RoomController()