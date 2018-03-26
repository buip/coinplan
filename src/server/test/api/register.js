/* eslint-disable no-unused-expressions */
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

mocha.describe('Test register route', () => {
	const iName = 'Preston';
	const iEmail = 'test@example.com';
	const iPassword = 'password';
	mocha.beforeEach(recreateDB);
	mocha.beforeEach(async () => {
		await new User(undefined, iName, iEmail, bcrypt.hashSync(iPassword, 10)).insert();
	});
	mocha.it('should register and return the correct user', done => {
		request(app)
			.post('/api/register')
			.send({
				name: 'Phuong',
				email: 'buip@beloit.edu',
				password: 'password'
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

	mocha.it('should fail because the user already exists', done => {
		request(app)
			.post('/api/register')
			.send({
				name: iName,
				email: iEmail,
				password: iPassword
			})
			.expect(400)
			.end(done);
	});

	mocha.it('should login the user ', done => {
		request(app)
			.post('/api/login')
			.send({
				email: iEmail,
				password: iPassword
			})
			.end(async (err, res) => {
				try {
					// noinspection BadExpressionStatementJS
					expect(res.header['x-access-token']).to.exist;
					expect(res.statusCode).to.equal(200);
					done();
				} catch (e) {
					done(e);
				}
			});
	});

	mocha.it('should not login the user because the credentials is invalid', done => {
		request(app)
			.post('/api/login')
			.send({
				email: iEmail,
				password: 'wrongpassword'
			})
			.end(async (err, res) => {
				try {
					// noinspection BadExpressionStatementJS
					expect(res.header['x-access-token']).to.not.exist;
					expect(res.statusCode).to.equal(401);
					done();
				} catch (e) {
					done(e);
				}
			});
	});
});
