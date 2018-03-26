const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const request = require('supertest');

const { recreateDB } = require('../db/common');
const app = require('../../app');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const mocha = require('mocha');

const { expect } = chai;

mocha.describe('Test users route', () => {
	const iName = 'Phuong Bui';
	const iEmail = 'test@example.com';
	const iPassword = bcrypt.hashSync('password', 10);
	mocha.beforeEach(recreateDB);
	mocha.beforeEach(async () => {
		await new User(undefined, iName, iEmail, iPassword).insert();
	});
	mocha.describe('/GET users', () => {
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
	});
});
