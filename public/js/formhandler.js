
var form = {};
var people = {};
var location = {};

form.pf = document.getElementById('peopleForm');
form.lf = document.getElementById('locationsForm');

const $lb = $('#peopleButton');
$lb.on('click', () => {
  location.name = form.pf.elements.name.value;
  location.family = form.pf.elements.family.value;
  location.region = form.pf.elements.region.value;
  superagent
    .post('http://localhost:9000/locations')
    .send(location)
    .set('Accept', 'application/json')
    .end((err, res) => {
      $('#locationResults').val(res.text);
    });
});

const $pb = $('#peopleButton');
$pb.on('click', () => {
  people.name = form.pf.elements.name.value;
  people.family = form.pf.elements.family.value;
  people.status = form.pf.elements.status.value;
  people.killed_by = form.pf.elements.killed_by.value;
  people.home = form.pf.elements.home.value;
  superagent
    .post('http://localhost:9000/people')
    .send(people)
    .set('Accept', 'application/json')
    .end((err, res) => {
      $('#peopleResults').val(res.text);
    });
});
