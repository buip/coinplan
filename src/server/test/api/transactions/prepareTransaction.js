const Transaction = require('../../../models/Transaction');

const transactionObj = {
	iAmount: 2.00,
	iFee: 0.05,
	iPrice: 6000.00,
	iCoinType: 'BTC',
	iCurrencyType: 'USD',
	iTransactionType: 'BUY',
	iUserID: 1,
};


/**
 * Return promise that includes the token.
 * @returns {Promise<*>}
 */
async function insertTransaction() {
	const {
		iAmount, iFee, iPrice, iCoinType, iCurrencyType, iTransactionType, iUserID
	} = transactionObj;

	await new Transaction(undefined, iAmount, iFee, iPrice, iCoinType, iCurrencyType, iTransactionType, undefined, iUserID).insert();
}

module.exports = {
	insertTransaction,
	transactionObj
};
