const express = require('express');
const app = express();
const morgan = require('morgan');
const people = require('../routes/people');
const locations = require('../routes/locations');

app.use(morgan('dev'));

app.use('/', express.static('public'));
app.use('/people', people);
app.use('/locations', locations);
app.get('/dead', (req, res) => {
  res.send('I see dead people.');
});


module.exports = app;
