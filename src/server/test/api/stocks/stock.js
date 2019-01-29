const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const { recreateDB } = require('../../db/common');
const Stock = require('../../../models/Stock');

const mocha = require('mocha');

const { expect } = chai;

mocha.describe('Test inserting stock', () => {
	mocha.beforeEach(recreateDB);

	mocha.it('should insert a new stock into database and be able to retrieve it', async () => {
		const stockPreInsert = new Stock(undefined, 'Apple', 'APPL');
		await stockPreInsert.insert();
		const stockPostInsert = await Stock.getAll();
		const expected = stockPostInsert[0];
		expect(expected.id).to.equal(1);
		expect(expected.stockName).to.deep.equal(stockPreInsert.stockName);
		expect(expected.stockSymbol).to.deep.equal(stockPreInsert.stockSymbol);
	});
});
