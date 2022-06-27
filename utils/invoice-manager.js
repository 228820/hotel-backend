const fs = require('fs')
const path = require('path')
const utils = require('util')
const puppeteer = require('puppeteer')
const hb = require('handlebars')
const db = require('../db/pg')
const dates = require('./dates-counter')


let pathForInvoice = ''
const dir = path.join(__dirname, '..', 'data')
const pathForTemplate = path.join(dir + '/template.html')

const data = {}

const readFile = utils.promisify(fs.readFile)

class InvoiceManager {
    checkIfDirectoryAndTemplateExist() {
        if (!fs.existsSync(dir)) {
            throw new Error('Directory not found.')
        } else {
            if (!fs.existsSync(pathForTemplate)) {
                throw new Error('File not found.')
            } else {
                return true
            }     
        }
    }

    async getDataFromDB(reservationId) {
        try {
            const { rows } = await db.query(`SELECT * FROM RESERVATIONS R INNER JOIN CLIENTS C
                                            ON R.CLIENT_ID = C.CLIENT_ID
                                            INNER JOIN ROOMS RM
                                            ON R.ROOM_ID = RM.ROOM_ID
                                            WHERE RESERVATION_ID = $1`, [reservationId])

            data.reservationId = reservationId
            data.date = new Date().toLocaleDateString("pl-PL")
            data.firstName = rows[0].first_name
            data.lastName = rows[0].last_name
            data.email = rows[0].email
            data.houseNumber = rows[0].house_number
            data.street = rows[0].street
            data.city = rows[0].city
            data.postalCode = rows[0].postal_code
            data.roomName = rows[0].title
            data.startDate = rows[0].start_date.toLocaleDateString("pl-PL")
            data.endDate = rows[0].end_date.toLocaleDateString("pl-PL")
            data.days = dates.calculateDaysBetweenDates(rows[0].start_date, rows[0].end_date)
            data.price = rows[0].price
            data.finalPrice = Number.parseInt(data.price) * data.days
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async getTemplateHtml() {
        console.log('Loading template file in memory')
        try {
            const invoicePath = pathForTemplate
            return await readFile(invoicePath, 'utf8')
        } catch (err) {
            return Promise.reject('Could not load html template')
        }
    }

    async generatePdf() {
        this.getTemplateHtml()
            .then(async (res) => {
                // Now we have the html code of our template in res object
                // you can check by logging it on console
                // console.log(res)
                console.log('Compiing the template with handlebars')
                const template = hb.compile(res, { strict: true })
                // we have compile our code with handlebars
                const result = template(data)
                // We can use this to add dyamic data to our handlebas template at run time from database or API as per need. you can read the official doc to learn more https://handlebarsjs.com/
                const html = result
                // we are using headless mode
                const browser = await puppeteer.launch()
                const page = await browser.newPage()
                // We set the page content as the generated html by handlebars
                await page.setContent(html)
                // We use pdf function to generate the pdf in the same folder as this file.
                await page.pdf({ path: pathForInvoice, format: 'A4' })
                await browser.close()
                console.log('PDF Generated')
            })
            .catch((err) => {
                throw new Error(err.message)
            })
    }

    async startGeneratingInvoice(reservationId) {
        try {
            //  Generate path for invoice
            pathForInvoice = path.join(dir + `/invoice_${reservationId}.pdf`)
    
            //  Get data from DB
            await this.getDataFromDB(reservationId)

            //  Generate PDF invoice
            return await this.generatePdf()
        } catch (err) {
            throw new Error(err.message)
        }
    }
}

module.exports = new InvoiceManager
