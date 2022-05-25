const jwt = require('jsonwebtoken')

const guard = (req, res, next) => {
    if (req.path === '/login') {
        next();
        return;
    }

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }

        req.user = user

        next()
    })
};

module.exports = guard
