const express = require('express');
const app = express();
const morgan = require('morgan');
const people = require('../routes/people');
const locations = require('../routes/locations');

app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', express.static('public'));
app.use('/people', people);
app.use('/locations', locations);
app.get('/dead', (req, res) => {
  res.send('I see dead people.');
});


module.exports = app;
