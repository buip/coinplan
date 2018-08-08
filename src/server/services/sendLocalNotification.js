const notifier = require('node-notifier');
const { log } = require('../log');

function sendLocalNotification(title, message) {
	notifier.notify({
		title: title,
		message: message
	}, err => {
		if (err) {
			log.error(err);
		} else {
			log.info('Sent notification');
		}
	});
}

module.exports = {
	sendLocalNotification
};
