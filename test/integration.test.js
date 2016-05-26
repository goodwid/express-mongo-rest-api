const app = require('../lib/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require ('../lib/setup-mongoose');
const assert = chai.assert;
chai.use(chaiHttp);


const testData = {
  name: 'Eddard Stark',
  allegiance: 'Stark',
  alive: false,
  home: '57461ec3ec025fa01f91c0ed',
  killed_by: 'Joffrey Baratheon'
};

describe('integration', () => {
  const request = chai.request(app);
  describe('POST', () => {
    it('inserts record', done => {
      request
        .post('/people')
        .set('Accept', 'application/json')
        .send(testData)
        .end((err, res) => {
          assert.isObject(JSON.parse(res.text));
          done();
        });

    });


  });
});
