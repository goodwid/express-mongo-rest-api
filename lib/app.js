const express = require('express');
const app = express();

const people = require('../routes/people');
const locations = require('../routes/locations');

app.use('/locations', locations);
app.use('/people', people);

module.exports = app;
