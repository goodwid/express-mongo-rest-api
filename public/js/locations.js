console.log('got here.');
superagent
  .get('http://localhost:9000/locations')
  .end((err, res) => {
    console.log('got to .end.');
    console.log(res);

    $('#results').text(res.text);
  });
