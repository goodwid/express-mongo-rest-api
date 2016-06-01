const app = require('../lib/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
require ('../lib/setup-mongoose');
const User = require('../models/user');
const token = require('../lib/token');

const assert = chai.assert;
chai.use(chaiHttp);

const testData = {
  name: 'Eddard Stark',
  allegiance: 'Stark',
  alive: false,
  home: '57461ec3ec025fa01f91c0ed',
  killed_by: 'Ser Ilyn Paine, The King\'s Justice',
  pedantic_instructor: true
};

const testAdmin = {
  username: 'testAdmin',
  password: 'chai'
};

const testUser1 = {
  username: 'testUser1',
  password: 'test1'
};

const testUser2 = {
  username: 'testUser2',
  password: 'test2'
};


describe('integration', () => {
  const request = chai.request(app);
  let id;
  describe('User creation', () => {

    before('create testAdmin user', function (done) {
      const user = new User(testAdmin);
      user.generateHash('chai');
      user.roles.push('admin');
      return user.save()
        .then(user => {
          token.sign(user);
          testAdmin.id = user._id;
          done();
        });
    });

    before('get token for testAdmin', function (done) {
      this.timeout(10000);
      request
      .post('/signin')
      .send(testAdmin)
      .end((err, res) => {
        const result = JSON.parse(res.text);
        testAdmin.token = result.token;
        done();
      });
    });

    it('create testUser1', function (done) {
      this.timeout(10000);
      request
        .post('/signup')
        .send(testUser1)
        .end((err, res) => {
          const result = JSON.parse(res.text);
          assert.property(result, 'token');
          assert.property(result, 'id');
          testUser1.token = result.token;
          testUser1.id = result.id;
          done();
        });
    });
    it('create testUser2', function (done) {
      this.timeout(10000);
      request
        .post('/signup')
        .send(testUser2)
        .end((err, res) => {
          const result = JSON.parse(res.text);
          assert.property(result, 'token');
          assert.property(result, 'id');
          testUser2.token = result.token;
          testUser2.id = result.id;
          done();
        });
    });

    it('set testUser1 as admin', function (done) {
      this.timeout(10000);
      request
      .post(`/users/${testUser1.id}/roles/admin`)
      .set('token', testAdmin.token)
      .end((err, res) => {
        const result = res.text;
        request
          .post('/signin')
          .send(testUser1)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            testUser1.token = result.token;
            done();
          });
      });
    });
  });

  describe('POST', () => {
    it('inserts record', function (done) {
      this.timeout(10000);
      request
        .post('/people')
        .set('token', testUser1.token)
        .send(testData)
        .end((err, res) => {
          const result = JSON.parse(res.text);
          id = result._id;
          assert.isObject(result);
          assert.propertyVal(result, 'name', 'Eddard Stark');
          done();
        });
    });
  });

  describe('GET', () => {
    it('retrieves the record', function (done) {
      this.timeout(10000);
      request
        .get(`/people/${id}`)
        .set('token', testUser1.token)
        .end((err, res) => {
          const result = JSON.parse(res.text);
          assert.isObject(result);
          assert.propertyVal(result, '_id', id);
          done();
        });
    });
  });

  describe('PUT', () => {
    it('modifies the record', function (done) {
      this.timeout(10000);
      request
        .get(`/people/${id}`)
        .set('token', testUser1.token)
        .end((err, res) => {
          const record = JSON.parse(res.text);
          record.name = 'Ned Stark';
          request
            .put(`/people/${id}`)
            .set('token', testUser1.token)
            .send(record)
            .end((err, res) => {
              const result = JSON.parse(res.text);
              assert.isObject(result);
              assert.propertyVal(result, 'name', 'Ned Stark');
              done();
            });
        });
    });
  });

  describe('DELETE', () => {
    it('unauthorized user fails to remove the record', function (done) {
      this.timeout(10000);
      request
        .delete(`/people/${id}`)
        .set('token', testUser2.token)
        .end((err, res) => {
          const result = JSON.parse(res.text);
          assert.isObject(result);
          assert.propertyVal(result, 'msg', 'Not Authorized');
          request
            .get(`/people/${id}`)
            .set('token', testUser2.token)
            .end((err, res) => {
              const getResult = JSON.parse(res.text);
              assert.isObject(result);
              done();
            });
        });
    });


    it('authorized user successfully removes the record', function (done) {
      this.timeout(10000);
      request
        .delete(`/people/${id}`)
        .set('token', testUser1.token)
        .end((err, res) => {
          const result = JSON.parse(res.text);
          assert.isObject(res.body);
          assert.propertyVal(result, '_id', id);
          request
            .get(`/people/${id}`)
            .set('token', testUser1.token)
            .end((err, res) => {
              const getResult = JSON.parse(res.text);
              assert.isObject(getResult);
              const expectedMessage = {error: { message: 'Entry not found'}};
              assert.deepEqual(getResult, expectedMessage);
              done();
            });
        });
    });
  });

  describe('dead people', () => {
    it('retrieves the ratio of people in the collection who are dead', function (done) {
      this.timeout(10000);
      request
        .get('/people/dead')
        .set('token', testUser1.token)
        .end((err, res) => {
          const result = JSON.parse(res.text);
          assert.isObject(result);
          assert.propertyVal(result, 'explanation', 'The percentage of people who are dead.');
          done();
        });
    });
  });


  after('delete testuser1', function (done) {
    this.timeout(10000);
    request
    .delete(`/users/${testUser1.id}`)
    .set('token', testAdmin.token)
    .end((err, res) => {
      done();
    });
  });

  after('delete testuser2', function (done) {
    this.timeout(10000);
    request
    .delete(`/users/${testUser2.id}`)
    .set('token', testAdmin.token)
    .end((err, res) => {
      done();
    });
  });

  after('delete testAdmin', function (done) {
    this.timeout(10000);
    request
    .delete(`/users/${testAdmin.id}`)
    .set('token', testAdmin.token)
    .end((err, res) => {
      done();
    });
  });

});
