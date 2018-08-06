const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const request = require('supertest');

const { recreateDB } = require('../../db/common');
const app = require('../../../app');
const Transaction = require('../../../models/Transaction');
const { insertUser } = require('../utils/prepareUser');
const { insertTransaction, transactionObj } = require('./prepareTransaction');

const mocha = require('mocha');

const { expect } = chai;

mocha.describe('Test transaction routes', () => {
	let token;

	const {
		iAmount, iFee, iPrice, iCoinType, iCurrencyType, iTransactionType, iUserID
	} = transactionObj;

	mocha.beforeEach(recreateDB);
	mocha.beforeEach(async () => {
		token = await insertUser();
		await insertTransaction();
	});

	mocha.it('should insert and return correct transaction', done => {
		request(app)
			.post('/api/transaction')
			.set('token', token)
			.send({
				amount: iAmount,
				fee: iFee,
				price: iPrice,
				coinType: iCoinType,
				currencyType: iCurrencyType,
				transactionType: iTransactionType,
				userID: iUserID
			})
			.end(async (err, res) => {
				try {
					const transactions = await Transaction.getByUser(iUserID);
					const {
						id, amount, fee, price, coinType, currencyType, transactionType, userID
					} = transactions[1];

					expect(amount).to.equal(iAmount.toString());
					expect(fee).to.equal(iFee.toString());
					expect(price).to.equal(iPrice.toString());
					expect(coinType).to.equal(iCoinType);
					expect(currencyType).to.equal(iCurrencyType);
					expect(transactionType).to.equal(iTransactionType);
					expect(userID).to.equal(iUserID);
					expect(res.statusCode).to.equal(200);
					expect(id).to.equal(2);
					done();
				} catch (e) {
					done(e);
				}
			});
	});

	mocha.it('should get transactions by user', done => {
		request(app)
			.get(`/api/transaction/${iUserID}`)
			.set('token', token)
			.end(async (err, res) => {
				try {
					expect(res.statusCode).to.equal(200);
					const {
						id, amount, fee, price, coinType, currencyType, transactionType, userID
					} = res.body[0];
					expect(amount).to.equal(iAmount.toString());
					expect(fee).to.equal(iFee.toString());
					expect(price).to.equal(iPrice.toString());
					expect(coinType).to.equal(iCoinType);
					expect(currencyType).to.equal(iCurrencyType);
					expect(transactionType).to.equal(iTransactionType);
					expect(userID).to.equal(iUserID);
					expect(id).to.equal(1);

					done();
				} catch (e) {
					done(e);
				}
			});
	});


	mocha.it('should get a single user by id', done => {
		request(app)
			.get('/api/transaction/1')
			.set('token', token)
			.end(async (err, res) => {
				try {
					expect(res.statusCode).to.equal(200);
					const {
						id, amount, fee, price, coinType, currencyType, transactionType, userID
					} = res.body[0];
					expect(amount).to.equal(iAmount.toString());
					expect(fee).to.equal(iFee.toString());
					expect(price).to.equal(iPrice.toString());
					expect(coinType).to.equal(iCoinType);
					expect(currencyType).to.equal(iCurrencyType);
					expect(transactionType).to.equal(iTransactionType);
					expect(userID).to.equal(iUserID);
					expect(id).to.equal(1);
					done();
				} catch (e) {
					done(e);
				}
			});
	});
});
