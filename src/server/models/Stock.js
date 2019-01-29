/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const database = require('./database');

const {
	db,
	sqlFile
} = database;

class Stock {
	constructor(id, stockName, stockSymbol) {
		this.id = id;
		this.stockName = stockName;
		this.stockSymbol = stockSymbol;
	}

	static createTable() {
		return db.none(sqlFile('stocks/create_stocks_table.sql'));
	}

	static async getByID(id) {
		const row = await db.one(sqlFile('stocks/get_stock_by_id.sql'), { id });
		return new Stock(row.id, row.stock_name, row.stock_symbol);
	}

	static async getBySymbol(symbol) {
		const row = await db.one(sqlFile('stocks/get_stock_by_symbol'), { symbol });
		return new Stock(row.id, row.stock_name, row.stock_symbol);
	}

	static async getAll() {
		const rows = await db.any(sqlFile('stocks/get_all_stocks.sql'));
		return rows.map(row => new Stock(row.id, row.stock_name, row.stock_symbol));
	}

	async insert() {
		const stock = this;
		if (stock.id !== undefined) {
			throw new Error('Attempted to insert a stock that already has an ID');
		}
		return db.none(sqlFile('stocks/insert_new_stock.sql'), stock);
	}
}

module.exports = Stock;
