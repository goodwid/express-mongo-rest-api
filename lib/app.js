const express = require('express');
const app = express();
const morgan = require('morgan');
const people = require('../routes/people');
const locations = require('../routes/locations');
const users = require('../routes/users');
const auth = require('../routes/auth');
const ensureAuth = require('./ensureAuth');
const ensureRole = require('./ensureRole');

app.use(morgan('dev'));

app.use('/', express.static('public'));

app.use('/', auth);

app.use('/people', ensureAuth, people);
app.use('/locations', ensureAuth, locations);
app.use('/users', ensureAuth, ensureRole('admin'), users);



module.exports = app;
