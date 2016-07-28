const People = require('../../models/people');
const mongoose = require('mongoose');

describe('People model', () => {
  it('requires name', done => {
    const dude = new People();
    dude.validate()
      .then(() => done('expected error'))
      .catch(() => done());
  });

  it('validates with required fields', done => {
    const dude = new People({name: 'Ned Stark', allegiance:'Stark', alive: true, home: '57461ec3ec025fa01f91c0ed'});
    dude.validate()
    .then(done)
    .catch(done);
  });

  after('remove mongoose model', () => {
    delete mongoose.connection.models['People'];
  });

});
