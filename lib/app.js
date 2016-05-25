const express = require('express');
const app = express();

const people = require('../routes/people');
const locations = require('../routes/locations');

app.use('/locations', locations);
app.use('/people', people);
app.get('/dead', (req, res) => {
  res.send('I see dead people.');
});

module.exports = app;