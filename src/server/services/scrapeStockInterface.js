/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const { ask, terminateReadline } = require('./utils');
const { scrapeStockSchedule } = require('./scrapeStock');

const regex = /^[a-zA-Z]+$/;

(async () => {
	let stockName;
	let lessOrMore;
	let target;

	// If there aren't enough args, go interactive.
	const cmdArgs = process.argv;
	if (cmdArgs.length !== 5) {
		stockName = await ask('What is the stock abbrev? ');
		if (stockName.match(regex)) {
			lessOrMore = await ask('Do you want to alert when it is greater than equal or less than? [>=|<] ');
			if (lessOrMore === '>=' || lessOrMore === '<') {
				target = await ask('What is your target price? ');
				if (isNaN(target)) {
					terminateReadline('Invalid target price');
				}
			} else {
				terminateReadline('Invalid input');
			}
		} else {
			terminateReadline('Invalid input');
		}

	} else {
		stockName = cmdArgs[2];
		lessOrMore = cmdArgs[3];
		target = cmdArgs[4];


		if (!stockName.match(regex) || (lessOrMore !== '>=' && lessOrMore !== '<') || isNaN(target)) {
			terminateReadline('Invalid input');
		}
	}

	scrapeStockSchedule(stockName, lessOrMore, target);
})();
