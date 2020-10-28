const bcryptjs = require('bcryptjs');
const users = require('../data/loginUsers.json');
const { signToken } = require('../helpers/signToken');


exports.login = async (req, res) => {
    const { email, password, remember } = req.body;

    try {
        let user = users.find(user => user.email === email);
        if(!user) return res.status(404).json({ msg: 'User not found' });

        const passCorrect = await bcryptjs.compare(password, user.password);
        if(!passCorrect) return res.status(401).json({ msg: 'Email or password not valid' });

        const token = signToken(user, remember);

        res.status(200).json({
            token,
            user: {
                userId: user.id,
                userEmail: user.email
            }
        })
    } catch(err) {
        console.log(err);
    }
};