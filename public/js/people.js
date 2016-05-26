const template = $('#template').html();
const compiler = Handlebars.compile(template);
const ul = $('ul');


superagent
  .get('/people')
  .end((err, res) => {
    res.body.forEach( item => {
      console.log(item);
      ul.append (compiler(item));
      $(`#${item._id}`).on('click', (e)=>{
        deletePerson(e.target.id);
      });
    });
  });

  function deletePerson(id) {
    superagent
      .del(`/people/${id}`)
      .end((err, res) => {
        console.log(res.body);
        // alert(res.body);
      });
  }
