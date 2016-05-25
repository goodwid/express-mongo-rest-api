const express = require('express');
const app = express();

const routeGenerator = require('../routes/generator');
const people = routeGenerator('../models/people');
const locations = routeGenerator('../models/locations');

app.use('/locations', locations);
app.use('/people', people);
app.get('/dead', (req, res) => {
  res.send('I see dead people.');
});

module.exports = app;
