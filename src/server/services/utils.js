/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
const readline = require('readline');
const { log } = require('../log');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

/**
 * Ask a question and then returns a promise of the response.
 * @param question is the string of the question you want to ask
 * @returns {Promise<any>} of the reponse
 */
function ask(question) {
	return new Promise(resolve => {
		rl.question(question, response => resolve(response));
	});
}

function terminateReadline(message) {
	if (message) {
		log.info(message);
	}
	rl.close();
	process.exit(0);
}

module.exports = {
	ask,
	terminateReadline
};
