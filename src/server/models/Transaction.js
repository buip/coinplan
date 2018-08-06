/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const database = require('./database');

const { db, sqlFile } = database;

class Transaction {
	/**
	  * @param id This users's ID. Should be undefined if the user is being newly created
	  * @param amount The amount of coin
	  * @param fee is the transaction fee
	  * @param price is the price of coin to currency type
	  * @param coinType type of crypto coin
	  * @param currencyType is the type of money
	  * @param transactionType either buy or sell
	  * @param createdAt is the transaction type
	  * @param userID id of user who made the transaction
	  */
	constructor(id, amount, fee, price, coinType, currencyType, transactionType, createdAt, userID) {
		this.id = id;
		this.amount = amount;
		this.fee = fee;
		this.price = price;
		this.coinType = coinType;
		this.currencyType = currencyType;
		this.transactionType = transactionType;
		this.createdAt = createdAt;
		this.userID = userID;
	}

	/**
	  * Returns a promise to create the transaction table
	  * @returns {Promise.<>}
	  */
	static async createTable() {
		await db.none(sqlFile('transactions/create_transaction_types.sql'));
		await db.none(sqlFile('transactions/create_transactions_table.sql'));
	}

	/**
	  * Returns a promise to retrieve a specific transaction
	  * @param id
	  * @returns {Promise.<Transaction>}
	  */
	static async getByID(id) {
		const row = await db.one(sqlFile('transactions/get_transaction_by_id.sql'), { id });
		return new Transaction(
			row.id,
			row.amount,
			row.fee,
			row.price,
			row.coin_type,
			row.currency_type,
			row.transaction_type,
			row.created_at,
			row.user_id
		);
	}

	/**
	  * Returns a promise to retrieve the all transaction by a user
	  * @param userID
	  * @returns {Promise.<User>}
	  */
	static async getByUser(userID) {
		const rows = await db.any(sqlFile('transactions/get_all_transactions_by_user.sql'), { userID });
		return rows.map(row => new Transaction(
			row.id,
			row.amount,
			row.fee,
			row.price,
			row.coin_type,
			row.currency_type,
			row.transaction_type,
			row.created_at,
			row.user_id
		));
	}

	/**
	  * Returns a promise to insert this transaction into the database
	  * @returns {Promise.<>}
	  */
	async insert() {
		const transaction = this;
		if (transaction.id !== undefined) {
			throw new Error('Attempted to insert a transaction that already has an ID');
		}
		return db.none(sqlFile('transactions/insert_new_transaction.sql'), transaction);
	}
}

module.exports = Transaction;
