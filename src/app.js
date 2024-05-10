const express = require('express');
const dayjs = require('dayjs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Middleware
app.use((req, res, next) => {
    const fechaActual = dayjs().format('DD-MM-YYYY HH:mm.ss');
    console.log(fechaActual);
    next();
});

app.use('/api', require('./routes/api'));
module.exports = app;