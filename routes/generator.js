function generateRoute(model) {

  const router = require('express').Router();
  const bodyParser = require('body-parser').json();
  const Item = require(model);

  var byId = (req) => ({_id: req.params.id});

  return router
   .get('/', (req, res) => {
     const query = req.query.type ? {type: req.query.type} : {};
     Item.find(query)
      .select('name family')
      .lean()
      .then( results => res.json(results));
   })
   .get('/:id', (req, res) => {
     Item.findOne(byId(req))
      .then(results => res.json(results));
   })
   .post('/', bodyParser, (req, res) => {
     new Item(req.body).save()
      .then(result => res.send(result))
      .catch(error => {
        console.log(error);
        res.json({error});
      });
   })
   .put('/:id', bodyParser, (req, res) => {
     Item.findOneAndUpdate(byId(req), req.body, {new:true})
      .then(result => res.json(result));
   })
   .delete('/:id', (req, res) => {
     Item.findOneAndRemove(byId(req))
      .then(result => res.json(result));
   });
}

module.exports = generateRoute;
