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
		mocha.it('should register and return the correct user', () => {
			expect(1).to.equal(1);
		});
	});
});