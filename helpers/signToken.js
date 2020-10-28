const jwt = require('jsonwebtoken');

exports.signToken = (payload, remember) => {
    const options = {
        algorithm: "HS256"
    };
    const rememberParsed = JSON.parse(remember)
    if(rememberParsed) {
        options.expiresIn = '999y'
    } else {
        options.expiresIn = '24h'
    }

    return (jwt.sign(payload, process.env.SECRET, options))
}