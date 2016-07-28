const Location = require('../../models/locations');
const mongoose = require('mongoose');

describe('Location model', () => {
  it('requires name', done => {
    const place = new Location();
    place.validate()
      .then(() => done('expected error'))
      .catch(() => done());
  });

  it('validates with required fields', done => {
    const place = new Location({name: 'Winterfell', family:'Stark', region:'North'});
    place.validate()
    .then(done)
    .catch(done);
  });

  after('remove mongoose model', () => {
    delete mongoose.connection.models['Locations'];
  });

});
