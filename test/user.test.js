const { describe, it, after } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');

chai.use(chaiHttp);

// eslint-disable-next-line no-unused-vars
const should = chai.should();

const baseUrl = '/users';

let user;

describe('users Test Suit', async () => {
  describe(`GET ${baseUrl}/`, () => {
    it('should return list of user', async () => {
      const res = await chai.request(app)
        .get(`${baseUrl}/`);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('data')
        .which
        .is
        .an('object')
        .that
        .has
        .property('users')
        .which
        .is
        .an('array')
        .which.is.an.empty;
    });
  });

  describe(`POST ${baseUrl}`, () => {
    it('should create a user. ', async () => {
      const body = {
        name: String(Math.floor(100000 + Math.random() * 900000)),
        age: 27,
        hobbies: [],
      };
      const res = await chai.request(app)
        .post(`${baseUrl}`)
        .send(body);

      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('data')
        .which
        .is
        .an('object')
        .that
        .has
        .property('user')
        .which
        .is
        .an('object');
      user = res.body.data.user;
    });

    it('should give validation error because name can not be blank.', async () => {
      const body = {
        name: '',
        age: 27,
        hobbies: ['cricket'],
      };

      const res = await chai
        .request(app)
        .post(`${baseUrl}`)
        .send(body);
      res.should.have.status(400);
      res.error.should.not.be.false;
    });

    it('should give validation error because name is not string.', async () => {
      const body = {
        name: 123,
        age: 27,
        hobbies: [],
      };

      const res = await chai
        .request(app)
        .post(`${baseUrl}`)
        .send(body);
      res.should.have.status(400);
      res.error.should.not.be.false;
    });

    it('should give validation error because body contains a unknown field [xyz].', async () => {
      const body = {
        name: 'Laxman',
        age: 27,
        hobbies: [],
        xyz: 123,
      };

      const res = await chai
        .request(app)
        .post(`${baseUrl}`)
        .send(body);
      res.should.have.status(400);
      res.error.should.not.be.false;
    });
  });

  describe(`PUT ${baseUrl}/:userId`, () => {
    const updatedName = String(Math.floor(100000 + Math.random() * 900000));
    const body = {
      name: updatedName,
    };
    it('should update a user of given id.', async () => {
      const res = await chai.request(app)
        .put(`${baseUrl}/${user.id}`)
        .send(body);

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('data')
        .which
        .is
        .an('object')
        .that
        .has
        .property('user')
        .which
        .is
        .an('object')
        .that
        .has
        .property('name')
        .which
        .is
        .equal(String(updatedName));
    });

    it('should update a user name of given id.', async () => {
      const tempBody = {
        name: String(Math.floor(100000 + Math.random() * 900000)),
      };
      const res = await chai.request(app)
        .put(`${baseUrl}/${user.id}`)

        .send(tempBody);

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('data')
        .which
        .is
        .an('object')
        .that
        .has
        .property('user')
        .which
        .is
        .an('object')
        .that
        .has
        .property('name')
        .which
        .is
        .equal(tempBody.name);
    });

    it('should update a user age of given id.', async () => {
      const tempBody = {
        age: 28,
      };
      const res = await chai.request(app)
        .put(`${baseUrl}/${user.id}`)

        .send(tempBody);

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('data')
        .which
        .is
        .an('object')
        .that
        .has
        .property('user')
        .which
        .is
        .an('object')
        .that
        .has
        .property('age')
        .which
        .is
        .equal(tempBody.age);
    });

    it('should update a user hobbies of given id.', async () => {
      const tempBody = {
        hobbies: ['cricket'],
      };
      const res = await chai.request(app)
        .put(`${baseUrl}/${user.id}`)

        .send(tempBody);

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('data')
        .which
        .is
        .an('object')
        .that
        .has
        .property('user')
        .which
        .is
        .an('object')
        .that
        .has
        .property('hobbies')
        .which
        .is
        .an('array');
    });

    it('should update a user with empty hobbies of given id.', async () => {
      const tempBody = {
        hobbies: [],
      };

      const res = await chai.request(app)
        .put(`${baseUrl}/${user.id}`)

        .send(tempBody);

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('data')
        .which
        .is
        .an('object')
        .that
        .has
        .property('user')
        .which
        .is
        .an('object')
        .that
        .has
        .property('hobbies')
        .which
        .is
        .an('array');
    });

    it('should return NotFound error.', async () => {
      const res = await chai.request(app)
        .put(`${baseUrl}/ff12b0e8-bac2-4b3a-a77b-875372a532b4`)
        .send(body);

      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.property('error')
        .which
        .is
        .an('object')
        .that
        .has
        .property('code')
        .which
        .is
        .an('number')
        .which
        .is
        .equal(404);
    });
  });

  describe(`GET ${baseUrl}/userId`, async () => {
    it('should return one user of given id.', async () => {
      const res = await chai.request(app)
        .get(`${baseUrl}/${user.id}`);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('data')
        .which
        .is
        .an('object')
        .which
        .has
        .property('user');
    });

    it('should give 404 not found error because data is not exist in DB', async () => {
      const res = await chai.request(app)
        .get(`${baseUrl}/ff12b0e8-bac2-4b3a-a77b-875372a532b4`) // or Any imaginary number, which should not exists as user id.
        ;
      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.property('error')
        .which
        .is
        .an('object')
        .which
        .has
        .property('message')
        .which
        .is
        .an('string');
    });
  });

  describe(`DELETE ${baseUrl}/userId`, () => {
    it('should delete one of given id', async () => {
      const res = await chai.request(app)
        .delete(`${baseUrl}/${user.id}`);
      res.should.have.status(204);
      res.body.should.be.a('object');
    });

    it('should give 404 not found error because given id is a deleted user.', async () => {
      const res = await chai.request(app)
        .get(`${baseUrl}/${user.id}`);
      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.property('error')
        .which
        .is
        .an('object')
        .which
        .has
        .property('message')
        .which
        .is
        .an('string');
    });
  });

  describe('Non existing route', () => {
    it('should not return config of user', async () => {
      const res = await chai.request(app)
        .get('/non-existing-route');
      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.property('error')
        .which
        .is
        .an('object')
        .that
        .has
        .property('message')
        .which
        .is
        .an('string');
    });
  });
});
