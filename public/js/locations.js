const template = $('#template').html();
const compiler = Handlebars.compile(template);
const ul = $('ul');

superagent
  .get('/locations')
  .end((err, res) => {
    res.body.forEach( item => {
      ul.append (compiler(item));
      $(`#${item._id}`).on('click', (e)=>{
        deleteLocation(e.target.id);
      });
    });
  });

function deleteLocation(id) {
  superagent
    .del(`/locations/${id}`)
    .end((err, res) => {
      console.log(res.body);
      // alert(res.body);
    });
}
