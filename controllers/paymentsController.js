const stripe = require('stripe')('sk_test_51LC2QfBXADR0JfNuwpVkDWWDimjT13925hcFSSzj8umcXfdC4jyvICqtjLR032DTTIVO5SKBOdDguoGArxs2b0A900uE4hBRnj');
const db = require('../db/pg')

const dates = require('../utils/dates-counter')
const APP_DOMAIN = 'http://localhost:3001'

// Payment succeeds 4242 4242 4242 4242
// Payment requires authentication 4000 0025 0000 3155
// Payment is declined 4000 0000 0000 9995

class PaymentsController {
    async getCheckoutSession(req, res) {
        try {
            const redirect = parseInt(req.params.redirect ?? '0')
            const roomId = req.params.room_id
            const reservationId = req.params.reservation_id
            if(!roomId) {
                return res.status(500).json({ message: 'Incorrect room id!' })
            }
            if(!reservationId) {
                return res.status(500).json({ message: 'Incorrect reservation id!' })
            }

            const roomsResult = await db.query('SELECT * FROM rooms WHERE room_id = $1', [roomId]);
            console.log(roomsResult.length)
            if (!roomsResult.rows || !roomsResult.rows.length) {
                return res.status(404).json({ message: 'Room not found!' })
            }
            const room = roomsResult.rows[0];

            const reservationsResult = await db.query(`
                SELECT c.*, DATE_PART('day', r.end_date::timestamp - r.start_date::timestamp) as days FROM reservations r
                JOIN clients c ON c.client_id = r.client_id
                WHERE r.reservation_id = $1
            `, [reservationId]);
            if (!reservationsResult.rows || !reservationsResult.rows.length) {
                return res.status(404).json({ message: 'Reservation not found!' })
            }
            const reservation = reservationsResult.rows[0];

            const successUrl = req.protocol + '://' + req.get('host') + `/checkout_success?session_id={CHECKOUT_SESSION_ID}&reservation_id=${reservationId}&room_id=${roomId}`;
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            currency: 'USD',
                            product_data: {
                                name: room.title,
                                description: room.description,
                                images: [room.img_link]
                            },
                            unit_amount_decimal: room.price * 100 * reservation.days
                        },
                        quantity: (reservation.days ?? 1),
                    },
                ],
                customer_email: reservation.email,
                mode: 'payment',
                success_url: successUrl,
                cancel_url: `${APP_DOMAIN}/checkout_cancel?session_id={CHECKOUT_SESSION_ID}`
            });

            if (redirect) {
                return res.redirect(303, session.url)
            }

            return res.status(200).json({url: session.url})
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    async onCheckoutSuccess(req, res) {
        const roomId = req.query.room_id
        const reservationId = req.query.reservation_id
        const session_id = req.query.session_id

        if(!roomId) {
            return res.status(500).json({ message: 'Incorrect room id!' })
        }

        if(!reservationId) {
            return res.status(500).json({ message: 'Incorrect reservation id!' })
        }

        try {
            let result = await db.query('SELECT * FROM reservations WHERE reservation_id = $1', [reservationId])
            const reservation = result.rows[0]

            result = await db.query('SELECT * FROM rooms WHERE room_id = $1', [roomId])
            const room = result.rows[0]

            await db.query('INSERT INTO payments (reservation_id, date, amount, card_id) VALUES ($1, $2, $3, $4)',
            [reservationId, new Date(), room.price * dates.calculateDaysBetweenDates(reservation.start_date, reservation.end_date), ''])
            await db.query('UPDATE reservations SET paid = TRUE WHERE reservation_id = $1', [reservationId])
        } catch (err) {
            console.error(err)
        }

        return res.redirect(303, `${APP_DOMAIN}/checkout_success?session_id=${session_id}&reservation_id=${reservationId}&room_id=${roomId}`)
    }
}

module.exports = new PaymentsController();