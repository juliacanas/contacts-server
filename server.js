"use strict";

require('dotenv').config()

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(
    cors({
        credentials: true,
        origin: process.env.PUBLIC_DOMAIN
    })
);

app.use(express.json({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT || 4000;

app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});