const db = require('../db/pg')

class RoomFeaturesController {
    async getAllRoomsFeatures(req, res) {
        // Try to get all rooms features
        try {
            const { rows } = await db.query('SELECT * FROM ROOM_FEATURES')
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

        // Try to get all room features
        try {
            //  Select features with 'pivot' so it easier to send to front
            const { rows } = await db.query(`select room_id, 
                                                case (select status from room_features where room_features.room_id = $1 and type = 'IS_WIFI')
                                                when true then true
                                                when false then false
                                                end is_wifi,
                                                
                                                case (select status from room_features where room_features.room_id = $1 and type = 'IS_PARKING')
                                                when true then true
                                                when false then false
                                                end is_parking,
                                                
                                                case (select status from room_features where room_features.room_id = $1 and type = 'ANIMAL_ALLOW')
                                                when true then true
                                                when false then false
                                                end animal_allow,
                                                
                                                case (select status from room_features where room_features.room_id = $1 and type = 'IS_BREAKFAST')
                                                when true then true
                                                when false then false
                                                end is_breakfast,
                                                
                                                case (select status from room_features where room_features.room_id = $1 and type = 'IS_ROOM_SERVICE')
                                                when true then true
                                                when false then false
                                                end is_room_service,
                                                
                                                case (select status from room_features where room_features.room_id = $1 and type = 'IS_LOUNGE')
                                                when true then true
                                                when false then false
                                                end is_lounge,
                                                
                                                case (select status from room_features where room_features.room_id = $1 and type = 'IS_POOL')
                                                when true then true
                                                when false then false
                                                end is_pool,
                                                
                                                case (select status from room_features where room_features.room_id = $1 and type = 'IS_SPA')
                                                when true then true
                                                when false then false
                                                end is_spa,
                                                
                                                case (select status from room_features where room_features.room_id = $1 and type = 'IS_GARDEN')
                                                when true then true
                                                when false then false
                                                end is_garden,
                                                
                                                case (select status from room_features where room_features.room_id = $1 and type = 'IS_GYM')
                                                when true then true
                                                when false then false
                                                end is_gym
                                            from room_features
                                            where room_id = $1
                                            group by room_id`, [id])
            return res.status(200).json({ rows })
        } catch (err) {
            return res.status(500).json({ message: err.message})
        }
    }


    async saveRoomFeatures(req, res) {
        const { room_id, type } = req.body
        let { status } = req.body

        // If status id not given set a value to not to save null value into db
        status === undefined ? status = false : status

        //  Check if every params which is need exists
        if(!room_id || !type) {
            return res.status(400).json({ message: 'Some parameters are missing!' })
        }

        // Try to save feature
        try {
            await db.query('INSERT INTO ROOM_FEATURES(ROOM_ID, TYPE, STATUS) VALUES($1, $2, $3)',
            [room_id, type, status])

            return res.sendStatus(201)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    async updateRoomFeatures(req, res) {
        //  Get room id from request
        const id = req.params.id
        if(!id) {
            return res.status(500).json({ message: 'Incorrect feature id!' })            
        }

        const { type } = req.body
        let { status } = req.body

        // If status id not given set a valu to not to save null value into db
        status === undefined ? status = false : status

        //  Check if every params which is need exists
        if(!type) {
            return res.status(400).json({ message: 'Some parameters are missing!' })
        }

        // Try to update feature of room_id == id and type == type
        try {
            await db.query('UPDATE ROOM_FEATURES SET STATUS = $1 WHERE ROOM_ID = $2 AND TYPE = $3',
            [status, id, type])

            return res.sendStatus(202)
        } catch (err) {
            return res.status(500).json({ message: err.message })            
        }
    }

    async setRoomFeatures(req, res) {
        const id = req.params.id
        if(!id) {
            return res.status(500).json({ message: 'Incorrect feature id!' })
        }

        let { type, status } = req.body

        type = type ? type.toString().toUpperCase() : ''

        if (status === null || status === undefined) {
            status = false;
        }

        try {
            const { rows } = await db.query('SELECT * FROM ROOM_FEATURES WHERE room_id=$1 AND type=$2', [id, type])
            if (rows.length === 0) { // we have to insert new feature
                await db.query('INSERT INTO ROOM_FEATURES(ROOM_ID, TYPE, STATUS) VALUES($1, $2, $3)', [id, type, status]);
            } else { // we have to update feature
                await db.query('UPDATE ROOM_FEATURES SET STATUS = $1 WHERE room_id = $2 AND type = $3', [status, id, type]);
            }

            return res.sendStatus(200);
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    async deleteRoomFeatures(req,res) {
        //  Get room id from request
        const id = req.params.id
        if(!id) {
            return res.status(500).json({ message: 'Incorrect feature id!' })            
        }

        const { type } = req.body

        //  Try to delete feature of room_id == id and type == type
        try {
            await db.query('DELETE FROM ROOM_FEATURES WHERE ROOM_ID = $1 AND TYPE = $2',
            [id, type])

            return res.sendStatus(204)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }        
    }
}

module.exports = new RoomFeaturesController
