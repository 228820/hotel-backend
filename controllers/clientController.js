const db = require('../db/pg')

class ClientController {
    async getAllClients(req, res) {
        // Try to get all clients
        try {
            const { rows } = await db.query('SELECT * FROM CLIENTS')

            //  Check if there are any clients
            if(!rows.length) {
                return res.status(404).json({ message: 'There are no clients to display! '})
            }

            res.status(200).json({ rows })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

    async getClientById(req, res) {
        try {
            //  Get client id from request
            const id = req.params.id
            if(!id) {
                return res.status(500).json({ message: 'Incorrect client id!' })            
            }

            // Try to get all clients
            const { rows } = await db.query('SELECT * FROM CLIENTS WHERE CLIENT_ID = $1', [id])

            //  Check if there are any clients
            if(!rows.length) {
                return res.status(404).json({ message: `There are no client of id: ${id}` })
            }

            res.status(200).json({ rows })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }   
    }

    async saveClient(req, res) {
        const { first_name,
                last_name,
                document_number,
                phone_number,
                email,
                postal_code,
                city,
                street,
                house_number,
                aparment_number
            } = req.body

        //  Check if every params which is need exists
        if(!first_name || !last_name || !document_number || !phone_number ||
            !email || !postal_code || !city || !street || !house_number) {
            
            return res.status(400).json({ message: 'Some parameters are missing!' })
        }

        // Try to add client
        try {
            await db.query(`INSERT INTO CLIENTS(FIRST_NAME, LAST_NAME, DOCUMENT_NUMBER, PHONE_NUMBER,
                            EMAIL, POSTAL_CODE, CITY, STREET, HOUSE_NUMBER, APARTMENT_NUMBER)
                            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                            [first_name, last_name, document_number, phone_number,
                            email, postal_code, city, street,
                            house_number, aparment_number])

            return res.sendStatus(201)
        } catch (err) {
            res.status(500).json({ message: err.message })
        } 
    }

    async updateClient(req, res) {
        //  Get client id from request
        const id = req.params.id
        if(!id) {
            return res.status(500).json({ message: 'Incorrect client id!' })            
        }

        //  Check if client exists
        const { rows } = await db.query('SELECT * FROM CLIENTS WHERE CLIENT_ID = $1', [id])

        //  Check if there are any clients
        if(!rows.length) {
            return res.status(404).json({ message: `There are no client of id: ${id}` })
        }

        const { first_name,
            last_name,
            document_number,
            phone_number,
            email,
            postal_code,
            city,
            street,
            house_number,
            aparment_number
        } = req.body

        //  Check if every params which is need exists
        if(!first_name || !last_name || !document_number || !phone_number ||
            !email || !postal_code || !city || !street || !house_number) {
            
            return res.status(400).json({ message: 'Some parameters are missing!' })
        }

        // Try to update client
        try {
            await db.query(`UPDATE CLIENTS SET FIRST_NAME = $1, LAST_NAME = $2, DOCUMENT_NUMBER = $3, PHONE_NUMBER = $4,
            EMAIL = $5, POSTAL_CODE = $6, CITY = $7, STREET = $8, HOUSE_NUMBER = $9, APARTMENT_NUMBER = $10
            WHERE CLIENT_ID = $11`,
            [first_name, last_name, document_number, phone_number,
            email, postal_code, city, street, house_number, aparment_number, id])

            return res.sendStatus(201)
        } catch (err) {
            return res.status(500).json({ message: err.message})            
        }
    }

    async deleteClient(req, res) {
        try {
            //  Get client id from request
            const id = req.params.id
            if(!id) {
                return res.status(500).json({ message: 'Incorrect client id!' })            
            }

            // Try to delete client of client_id == id
            await db.query('DELETE FROM CLIENTS WHERE CLIENT_ID = $1', [id])

            res.sendStatus(204)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }        
    }
}

module.exports = new ClientController
