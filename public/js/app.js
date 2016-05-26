const locations = {};
locations.template = $('#locationtemplate').html();
locations.compiler = Handlebars.compile(locations.template);
locations.ul = $('#locations');

const people = {}
people.template = $('#peopletemplate').html();
people.compiler = Handlebars.compile(people.template);
people.ul = $('#people');


locations.deleteRecord = function(id) {
  superagent
  .del(`/locations/${id}`)
  .end((err, res) => {
    console.log(res.body);

  });
};

locations.getData = function() {
  superagent
    .get('/locations')
    .end((err, res) => {
      res.body.forEach( item => {
        locations.ul.append (locations.compiler(item));
        $(`#${item._id}`).on('click', (e)=>{
          locations.deleteRecord(e.target.id);
        });
      });
    });
};

people.deleteRecord = function(id) {
  superagent
  .del(`/people/${id}`)
  .end((err, res) => {
    console.log(res.body);
  });
};

people.getData = function() {
  superagent
    .get('/people')
    .end((err, res) => {
      res.body.forEach( item => {
        people.ul.append (people.compiler(item));
        $(`#${item._id}`).on('click', (e)=>{
          people.deleteRecord(e.target.id);
        });
      });
    });
};

people.getData();
locations.getData();
