const router = module.exports = require('express').Router();
const bodyParser = require('body-parser').json();
const People = require('../models/people');

router
 .get('/', (req, res) => {
   const query = req.query.type ? {type: req.query.type} : {};
   People.find(query)
    .select('name family home')
    .populate('home', 'name')
    .lean()
    .then( results => res.json(results));
 })
 .get('/:id', (req, res) => {
   People.findbyId(req.params.id)
    .then(results => res.json(results));
 })
 .post('/', bodyParser, (req, res) => {
   new People(req.body).save()
    .then(result => res.send(result))
    .catch(error => {
      console.log(error);
      res.json({error});
    });
 })
 .put('/:id', bodyParser, (req, res) => {
   People.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(result => res.json(result));
 })
 .delete('/:id', (req, res) => {
   People.findByIdAndRemove(req.params.id)
    .then(result => res.json(result));
 });
