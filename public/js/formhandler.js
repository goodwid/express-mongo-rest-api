
var form = {};
form.pf = document.getElementById('peopleForm');

var people = {};

const $pb = $('#peopleButton');
$pb.on('click', () => {
  people.name = form.pf.elements.name.value;
  people.family = form.pf.elements.family.value;
  people.status = form.pf.elements.status.value;
  people.killed_by = form.pf.elements.killed_by.value;
  people.home = form.pf.elements.home.value;

  console.log(JSON.stringify(people));
  superagent
    .post('http://localhost:9000/people')
    .send(JSON.stringify(people))
    .set('Accept', 'application/json')
    .end((err, res) => {
      var results;
      if (err) alert('Error in submission');
      try {
        results = JSON.parse(res);
      } catch (e) {
        console.log(e);
        results = res;
      }
      $('#peopleResults').val(JSON.parse(res));
``
    });
});
