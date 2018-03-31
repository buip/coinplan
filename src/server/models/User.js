/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const database = require('./database');

const { db, sqlFile } = database;

class User {
	/**
     * @param id This users's ID. Should be undefined if the user is being newly created
     * @param name
     * @param email This user's email
     * @param passwordHash The user's passwordHash
     * @param authToken is the token use to authenticate routes
     * @param passwordToken is the token send to user's email to reset password
     * @param passwordTokenTime is the time that password reset token expires
     */
	constructor(id, name, email, passwordHash, authToken, passwordToken, passwordTokenTime) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.passwordHash = passwordHash;
		this.authToken = authToken;
		this.passwordToken = passwordToken;
		this.passwordTokenTime = passwordTokenTime;
	}

	/**
     * Returns a promise to create the users table
     * @returns {Promise.<>}
     */
	static createTable() {
		return db.none(sqlFile('users/create_users_table.sql'));
	}

	/**
     * Returns a promise to retrieve the user with the given id from the database.
     * @param id
     * @returns {Promise.<User>}
     */
	static async getByID(id) {
		const row = await db.one(sqlFile('users/get_user_by_id.sql'), { id });
		return new User(row.id, row.name, row.email);
	}

	/**
     * Returns a promise to retrieve the user with the given email from the database.
     * This exposes the user's password_hash and should only be used for authentication purposes.
     * @param email
     * @returns {Promise.<User>}
     */
	static async getByEmail(email) {
		const row = await db.one(sqlFile('users/get_user_by_email.sql'), { email });
		return new User(row.id, row.name, row.email, row.password_hash, row.password_token, row.password_token_time);
	}

	/**
     * Returns a promise to get all of the user from the database
     * @returns {Promise.<array.<User>>}
     */
	static async getAll() {
		const rows = await db.any(sqlFile('users/get_all_users.sql'));
		return rows.map(row => new User(row.id, row.name, row.email));
	}

	/**
     * Returns a promise to insert password token
     * @returns {Promise.<array.<User>>}
     */
	static async insertPasswordToken(email, passwordToken) {
		return db.none(sqlFile('users/update_user_password.sql'), { email, password_token: passwordToken });
	}

	/**
	 * Returns a promise to update a user's password
	 * @returns {Promise.<array.<User>>}
	 */
	static async updateUserPassword(email, passwordHash) {
		return db.none(sqlFile('users/update_user_password.sql'), { email, password_hash: passwordHash });
	}

	/**
     * Returns a promise to insert this user into the database
     * @returns {Promise.<>}
     */
	async insert() {
		const user = this;
		if (user.id !== undefined) {
			throw new Error('Attempted to insert a user that already has an ID');
		}
		return db.none(sqlFile('users/insert_new_user.sql'), user);
	}
}

module.exports = User;
