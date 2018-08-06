const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const request = require('supertest');

const { recreateDB } = require('../../db/common');
const app = require('../../../app');
const Transaction = require('../../../models/Transaction');
const { insertUser } = require('../utils/prepareUser');

const mocha = require('mocha');

const { expect } = chai;

mocha.describe('Test transaction routes', () => {
	let token;
	const iAmount = 2.00;
	const iFee = 0.05;
	const iPrice = 6000.00;
	const iCoinType = 'BTC';
	const iCurrencyType = 'USD';
	const iTransactionType = 'BUY';
	const iUserID = 1;

	mocha.beforeEach(recreateDB);
	mocha.beforeEach(async () => {
		token = await insertUser();
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
						amount, fee, price, coinType, currencyType, transactionType, userID
					} = transactions[0];

					expect(amount).to.equal(iAmount.toString());
					expect(fee).to.equal(iFee.toString());
					expect(price).to.equal(iPrice.toString());
					expect(coinType).to.equal(iCoinType);
					expect(currencyType).to.equal(iCurrencyType);
					expect(transactionType).to.equal(iTransactionType);
					expect(userID).to.equal(iUserID);
					expect(res.statusCode).to.equal(200);
					done();
				} catch (e) {
					done(e);
				}
			});
	});
});
