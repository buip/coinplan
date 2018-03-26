const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const request = require('supertest');

const { recreateDB } = require('../db/common');
const app = require('../../app');
const User = require('../../models/User');

const mocha = require('mocha');

const { expect } = chai;

mocha.describe('Test register route', () => {
	mocha.beforeEach(recreateDB);
	mocha.describe('POST /users', () => {
		mocha.it('should register and return the correct user', done => {
			const iName = 'Preston';
			const iEmail = 'test@example.com';
			const iPassword = 'password';
			request(app)
				.post('/api/register')
				.send({
					name: iName,
					email: iEmail,
					password: iPassword
				})
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
