const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/verifyToken');
const contacts = require('../data/contacts.json');

router.get('/', verifyToken, (req, res) => {
    res.json(contacts)
})

module.exports = router;