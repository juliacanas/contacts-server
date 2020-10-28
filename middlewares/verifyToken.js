const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token') || req.headers['authorization'];

    if(!token) return res.status(401).json({ msg: 'No token provided' });
    if(token.startsWith('Bearer')) token = token.split(' ')[1]

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) res.status(401).json({ msg: 'Token not valid' });
        req.decoded = decoded
        next()
    })
};