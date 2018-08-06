const express = require('express');
const Transaction = require('../models/Transaction');
const authenticator = require('./authenticator');
const { log } = require('../log');

const router = express.Router();

router.use(authenticator);

/**
 * Route for getting a specific user by ID
 * @param user_id
 */
router.get('/:user_id', async (req, res) => {
	try {
		const rows = await Transaction.getByUser(req.params.user_id);
		res.json(rows);
	} catch (err) {
		log.info('Error while performing GET specific user by id query:', err);
		res.sendStatus(500);
	}
});

/**
 * Route for getting a specific user by ID
 * @param user_id
 */
router.get('/:transaction_id', async (req, res) => {
	try {
		const rows = await Transaction.getByID(req.params.transaction_id);
		res.json(rows);
	} catch (err) {
		log.info('Error while performing GET specific user by id query:', err);
		res.sendStatus(500);
	}
});

/**
 * Route for getting a specific user by ID
 * @param user_id
 */
router.post('/', async (req, res) => {
	const {
		amount, fee, price, coinType, currencyType, transactionType, userID
	} = req.body;
	const transaction = new Transaction(undefined, amount, fee, price, coinType, currencyType, transactionType, undefined, userID);
	try {
		await transaction.insert();
		res.sendStatus(200);
	} catch (err) {
		const message = 'Error while inserting transaction';
		log.info('Error while performing POST to create new transaction:', err);
		res.status(400).send({
			success: false,
			message: message
		});
	}
});

module.exports = router;
