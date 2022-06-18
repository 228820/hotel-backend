const db = require('../db/pg')
const FilesManager = require("../utils/files-manager");
const uuid = require('uuid');

class RoomController {
    async getAllRooms(req, res) {
        // Try to get all rooms
        try {
            const { rows } = await db.query('SELECT * FROM ROOMS ORDER BY room_id DESC  ')
            return res.status(200).json({ rows })
        } catch (err) {
            return res.status(500).json({ message: err.message})
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

    async saveRoom(req, res) {
        const { title, sleeps, floor, price, description, extended_description } = req.body
        let { img_link } = req.body

        // If img_link is not given set a valu to not to save null value into db
        img_link === undefined ? img_link = '' : img_link

        if (img_link && img_link.includes('base64')) {
            img_link = await FilesManager.saveBase64ToFile(req, img_link, 'room_image_' + uuid.v4());
        }

        //  Check if every params which is need exists
        if(!title || !sleeps || !floor || !price) {
            return res.status(400).json({ message: 'Some parameters are missing!' })
        }

        // Try to save room
        try {
            const result = await db.query(`INSERT INTO ROOMS(IMG_LINK, TITLE, SLEEPS, FLOOR, PRICE, DESCRIPTION, EXTENDED_DESCRIPTION)
            VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING room_id`,
            [img_link, title, sleeps, floor, price, description ?? '', extended_description ?? ''])

            return res.status(200).json({ id: result?.rows[0]?.room_id ?? 0})
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    async updateRoom(req, res) {
        //  Get room id from request
        const id = req.params.id
        if(!id) {
            return res.status(500).json({ message: 'Incorrect room id!' })            
        }

        const { title, sleeps, floor, price, description, extended_description } = req.body
        let { img_link } = req.body

        // If img_link is not given set a valu to not to save null value into db
        img_link === undefined ? img_link = '' : img_link

        if (img_link && img_link.includes('base64')) {
            img_link = await FilesManager.saveBase64ToFile(req, img_link, 'room_image_' + id);
        }

        //  Check if every params which is need exists
        if(!title || !sleeps || !floor || !price) {
            return res.status(400).json({ message: 'Some parameters are missing!' })
        }

        // Try to update room of room_id = id
        try {
            await db.query(`UPDATE ROOMS SET IMG_LINK = $1, TITLE = $2, SLEEPS = $3,
            FLOOR = $4, PRICE = $5, DESCRIPTION = $6, EXTENDED_DESCRIPTION = $7
            WHERE ROOM_ID = $8`,
            [img_link, title, sleeps, floor, price, description ?? '', extended_description ?? '', id])

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
