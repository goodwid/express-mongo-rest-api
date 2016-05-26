const router = module.exports = require('express').Router();
const bodyParser = require('body-parser').json();
const People = require('../models/people');
const validHouses = ['Stark', 'Lannister', 'Targaryen', 'Bolton', 'Night\'s Watch', 'Tyrell', 'Greyjoy', 'Baratheon', 'Tully', 'Martell', 'Arryn'];

router
 .get('/', (req, res) => {
   const query = req.query.type ? {type: req.query.type} : {};
   People.find(query)
    .select('name allegiance home')
    .populate('home', 'name')
    .lean()
    .then( results => res.json(results));
 })
 .get('/:id', (req, res) => {
   People.findById(req.params.id)
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        res.json({error: { message: 'Entry not found'}});
      }
    });
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
    People.findById(req.params.id)
      .then(result => {
        if (validHouses.indexOf(req.body.allegiance) === -1) {
          res.json({error:{ message: 'Sorry, that is not a valid Great House.'}});
        } else {
          new People(Object.assign(result, req.body)).save()
            .then(result => res.send(result))
            .catch(error => {
              console.log(error);
              res.json({error});
            });
        }
      });
  })
  .delete('/:id', (req, res) => {
    People.findByIdAndRemove(req.params.id)
    .then(result => res.json(result));
  });
