const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('node-cron');

cron.schedule('* * * * *', () => {
	axios.get('https://www.nasdaq.com/symbol/crnx/real-time')
		.then(response => {
			if (response.status === 200) {
				const html = response.data;
				const $ = cheerio.load(html);

				const price = Number($('#qwidget_lastsale').text().substr(1));
				console.log(price);
			}
		}, error => console.log(error));
});
