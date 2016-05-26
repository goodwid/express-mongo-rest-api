const locations = {};
locations.template = $('#locationtemplate').html();
locations.compiler = Handlebars.compile(locations.template);
locations.ul = $('#locations');

const people = {};
people.template = $('#peopletemplate').html();
people.compiler = Handlebars.compile(people.template);
people.ul = $('#people');

const entryForm = {};
const $lb = $('#locationsButton');
const $pb = $('#peopleButton');


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

$pb.on('click', () => {
  console.log('pb clicked');
  const people = {};
  entryForm.pf = document.getElementById('peopleForm');
  people.name = entryForm.pf.elements.name.value;
  people.family = entryForm.pf.elements.family.value;
  people.status = entryForm.pf.elements.status.value;
  people.killed_by = entryForm.pf.elements.killed_by.value;
  people.home = entryForm.pf.elements.home.value;
  superagent
    .post('http://localhost:9000/people')
    .send(people)
    .set('Accept', 'application/json')
    .end((err, res) => {
      $('#peopleResults').text(res.text);
    });
});

$lb.on('click', () => {
  console.log('lb clicked');
  const location = {};
  entryForm.lf = document.getElementById('locationsForm');
  location.name = entryForm.lf.elements.name.value;
  location.family = entryForm.lf.elements.family.value;
  location.region = entryForm.lf.elements.region.value;
  superagent
  .post('http://localhost:9000/locations')
  .send(location)
  .set('Accept', 'application/json')
  .end((err, res) => {
    $('#locationResults').text(res.text);
  });
});

people.getData();
locations.getData();
