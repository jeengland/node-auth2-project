const jwt = require('jsonwebtoken');

require('dotenv').config();

const  authenticator = (req, res, next) => {
    const token = req.headers.authorization;
    const secret = process.env.SECRET;

    if (token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if (error) {
                res.status(401).json({
                    message: 'Authentication failed!'
                })
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        res.status(400).json({
            message: 'No credentials provided!'
        })
    }
}

module.exports = authenticator;