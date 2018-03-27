// /* eslint-disable no-unused-expressions */
// const chai = require('chai');
// const chaiAsPromised = require('chai-as-promised');
//
// chai.use(chaiAsPromised);
// const request = require('supertest');
//
// const { recreateDB } = require('../db/common');
// const app = require('../../app');
// const User = require('../../models/User');
//
// const {
// 	iName, iEmail, iPassword, insertUser
// } = require('./prepareUser');
//
// const mocha = require('mocha');
//
// const { expect } = chai;
//
// mocha.describe('Test register route', () => {
// 	mocha.beforeEach(recreateDB);
// 	mocha.beforeEach(async () => {
// 		await insertUser();
// 	});
// 	mocha.it('should register and return the correct user', done => {
// 		request(app)
// 			.post('/api/register')
// 			.send({
// 				name: 'Phuong',
// 				email: 'buip@beloit.edu',
// 				password: 'password'
// 			})
// 			.end(async (err, res) => {
// 				try {
// 					const users = await User.getAll();
// 					const { name, email } = users[0];
// 					expect(name).to.equal(iName);
// 					expect(email).to.equal(iEmail);
// 					expect(res.statusCode).to.equal(200);
// 					done();
// 				} catch (e) {
// 					done(e);
// 				}
// 			});
// 	});
//
// 	mocha.it('should fail because the user already exists', done => {
// 		request(app)
// 			.post('/api/register')
// 			.send({
// 				name: iName,
// 				email: iEmail,
// 				password: iPassword
// 			})
// 			.expect(400)
// 			.end(done);
// 	});
// });
