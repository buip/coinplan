const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const request = require('supertest');

const { recreateDB } = require('../../db/common');
const app = require('../../../app');
const User = require('../../../models/User');
const {
	iName, iEmail, insertUser
} = require('../utils/prepareUser');

const mocha = require('mocha');

const { expect } = chai;

mocha.describe('Test users route', () => {
	let token;
	mocha.beforeEach(recreateDB);
	mocha.beforeEach(async () => {
		token = await insertUser();
	});
	mocha.it('should get all users', done => {
		request(app)
			.get('/api/users')
			.end(async (err, res) => {
				try {
					const users = await User.getAll();
					const { name, email } = users[0];
					expect(name).to.equal(iName);
					expect(email).to.equal(iEmail);
					expect(res.statusCode).to.equal(200);
					done();
				} catch (e) {
					done(e);
				}
			});
	});
	mocha.it('should get a single user by id', done => {
		request(app)
			.get(`/api/users/${iEmail}`)
			.set('token', token)
			.end(async (err, res) => {
				try {
					expect(res.statusCode).to.equal(200);
					const { name, email } = res.body;
					expect(name).to.equal(iName);
					expect(email).to.equal(iEmail);
					done();
				} catch (e) {
					done(e);
				}
			});
	});
});
