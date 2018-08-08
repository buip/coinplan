const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('node-cron');
const { log } = require('../log');
const { sendLocalNotification } = require('./sendLocalNotification');

function scrapeStockSchedule(stockName, lessOrMore, target) {
	log.info('Monitoring');
	cron.schedule('* * * * *', () => {
		axios.get(`https://www.nasdaq.com/symbol/${stockName.toUpperCase()}/real-time`)
			.then(response => {
				if (response.status === 200) {
					const html = response.data;
					const $ = cheerio.load(html);

					const price = Number($('#qwidget_lastsale').text().substr(1));

					if (lessOrMore === '>=') {
						if (price >= target) {
							sendLocalNotification(stockName, `Price is above target ($${target}). Price is $${price}`);
						}
					} else if (lessOrMore === '<') {
						if (price < target) {
							sendLocalNotification('Stock Notification', `Price is below target ($${target}). Price is $${price}`);
						}
					}
				}
			}, error => log.error(error));
	});
}

module.exports = {
	scrapeStockSchedule
};

