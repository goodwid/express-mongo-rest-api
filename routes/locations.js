const router = module.exports = require('express').Router();
const bodyParser = require('body-parser').json();
const Location = require('../models/locations');

router
 .get('/', (req, res) => {
   const query = req.query.type ? {type: req.query.type} : {};
   Location.find(query)
    .select('name family')
    .lean()
    .then( results => res.json(results))
    .catch(err => {
      res.status(500).json({
        msg: 'Unable to locate locations',
        reason: err
      });
    });
 })
 .get('/:id', (req, res) => {
   Location.findById(req.params.id)
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        res.json({error: { message: 'Entry not found'}});
      }
    })
    .catch(err => {
      res.status(500).json({
        msg: 'Unable to find record',
        reason: err
      });
    });
 })
 .post('/', bodyParser, (req, res) => {
   new Location(req.body).save()
    .then(result => res.send(result))
    .catch(error => {
      console.log(error);
      res.json({error});
    });
 })
 .put('/:id', bodyParser, (req, res) => {
   Location.findById(req.params.id)
    .then(result => {
      if (result) {
        new Location(Object.assign(result, req.body)).save()
        .then(result => res.send(result))
        .catch(error => {
          console.log(error);
          res.json({error});
        });
      }
    }).catch(error => {
      console.log(error);
      res.json({error});
    });
 })
 .delete('/:id', (req, res) => {
   Location.findByIdAndRemove(req.params.id)
    .then(result => res.json(result))
    .catch(err => {
      res.status(500).json({
        msg: 'Unable to delete location',
        reason: err
      });
    });
 });
