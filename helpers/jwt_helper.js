const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const users = require('../data/loginUsers.json')

module.exports = {
    signAccessToken: (payload, remember) => {
        return new Promise((resolve, reject) => {
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                algorithm: "HS256"
            }
            const rememberParsed = JSON.parse(remember)
            if(rememberParsed) {
                options.expiresIn = '7d'
            } else {
                options.expiresIn = '24h'
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if(err) {
                    console.log(err.message)
                    reject(createError.InternalServerError())
                }
                resolve(token)
            })
        })
    },
    signRefreshToken: (payload) => {
    return new Promise((resolve, reject) => {
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const options = {
            expiresIn: '1y',
        }
        JWT.sign(payload, secret, options, (err, token) => {
            if(err) {
                console.log(err.message)
                reject(createError.InternalServerError())
            }
            resolve(token)
        })
    })
    },
    verifyAccessToken: (req, res, next) => {
        const token = req.header('x-auth-token') || req.headers['authorization'];
        if(!token) return next(createError.Unauthorized())
        if(token.startsWith('Bearer')) token = token.split(' ')[1]

        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if(err) {
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                return next(createError.Unauthorized(message))
            }
            req.payload = payload;
            next()
        })
    },
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                if(err) return reject(createError.Unauthorized())
                const user = users.find(user => user.id === payload.userId);
                const userWithoutPass = {
                    userId: user.id,
                    userEmail: user.email,
                    userName: user.username
                }
                resolve(userWithoutPass);
            })
        })
    },
}