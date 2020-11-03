"use strict";

require('dotenv').config()

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const app = express();

const authRoutes = require('./routes/auth');
const contactsRoutes = require('./routes/contacts');

app.get('/', async (req, res, next) => {
    res.send('Hello from express.')
})

app.use(
    cors({
        credentials: true,
        origin: process.env.PUBLIC_DOMAIN
    })
);

app.use(express.json({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

/* app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts')); */

app.use('/api/auth', authRoutes)
app.use('/api/contacts', contactsRoutes);

app.use(async (req, res, next) => {
    next(createError.NotFound('Route not found'));
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});