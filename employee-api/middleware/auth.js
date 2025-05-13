const jwt = require('jsonwebtoken');
const { AUTH_ENABLED, JWT_SECRET } = require('../config');

function authenticateToken(req, res, next) {
    if (!AUTH_ENABLED) return next();

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
