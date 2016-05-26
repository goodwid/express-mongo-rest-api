const template = $('#template').html();
const compiler = Handlebars.compile(template);
const ul = $('ul');

superagent
  .get('http://localhost:9000/locations')
  .end((err, res) => {
    res.body.forEach( item => {
      ul.append (compiler(item));
    });

  });
