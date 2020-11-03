const express = require('express');
const router = express.Router();
const contacts = require('../data/contacts.json');
const { verifyAccessToken } = require('../helpers/jwt_helper');

router.get('/', verifyAccessToken, (req, res) => {
    res.json(contacts)
})

module.exports = router;