const createError = require('http-errors');
const bcryptjs = require('bcryptjs');
const users = require('../data/loginUsers.json');
const {authSchema} = require('../helpers/validation_schema');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt_helper');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { email, password, remember} = req.body;
            const result = await authSchema.validateAsync({email, password});

            let user = users.find(user => user.email === result.email);
            if(!user) throw createError.NotFound('User not registered');

            const passCorrect = await bcryptjs.compare(result.password, user.password);
            if(!passCorrect) throw createError.Unauthorized('Incorrect password');

            const userWithoutPass = {
                userId: user.id,
                userEmail: user.email,
                userName: user.username
            }
  
            const accessToken = await signAccessToken(userWithoutPass, remember)
            const refreshToken = await signRefreshToken(userWithoutPass)
            res.send({token: accessToken, refreshToken, user: userWithoutPass})
    
        } catch (error) {
            if(error.isJoi === true) 
            return next(createError.BadRequest("Invalid email/password"))
            next(error)
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const {refreshToken} = req.body
            if (!refreshToken) throw createError.BadRequest()
            const user = await verifyRefreshToken(refreshToken)

            const remember = false;
            const accessToken = await signAccessToken(user, remember) 
            const refToken = await signRefreshToken(user)
            res.send({ accessToken, refreshToken: refToken, user })
        } catch (error) {
            next(error)
        }
    },
}
