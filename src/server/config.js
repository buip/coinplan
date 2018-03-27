/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
// Try to load the .env file

const envPath = path.join(__dirname, '..', '..', '.env');
try {
	fs.accessSync(envPath);
	dotenv.config({ path: envPath });
} catch (err) {
	// TODO: Check if valid env variables are actually loaded despite the lack of a file, only log if they are not
	// console.log("Couldn't load a .env file");
}

const config = {};

// Database configuration is taken from environment variables (which are loaded by dotenv from the .env file)
config.database = {
	user: process.env.COINPLAN_DB_USER,
	database: process.env.COINPLAN_DB_DATABASE,
	password: process.env.COINPLAN_DB_PASSWORD,
	host: process.env.COINPLAN_DB_HOST,
	port: process.env.COINPLAN_DB_PORT
};

config.secretToken = process.env.COINPLAN_TOKEN_SECRET;
config.serverPort = process.env.COINPLAN_SERVER_PORT;
config.logFile = process.env.COINPLAN_LOG_FILE || 'log.txt';
config.email = process.env.COINPLAN_PASSWORD_EMAIL;

module.exports = config;
