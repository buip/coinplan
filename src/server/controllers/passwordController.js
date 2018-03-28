const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const { sendingName, sendingEmail, sendingEmailPassword } = require('../config');


async function resetPasswordInit(email) {
	const user = await User.getByEmail(email);
	if (user.length === 0) {
		throw new Error('User not found');
	} else {
		const token = crypto.randomBytes(20).toString('hex');
		await User.insertPasswordToken(email, token);
		const transporter = nodemailer.createTransport(`smtps://${sendingEmail}:${sendingEmailPassword}@smtp.gmail.com`);
		const mailOptions = {
			from: `"${sendingName}" <${sendingEmail}>`,
			to: email,
			subject: 'Reset Password Request ',
			html: `Hello ${user.name},

    			     Your reset password token is. 
    			If you are viewing this mail from a Android Device click this
    			<a href='http://localhost:3000/auth/reset_password?token=${token}'>link</a>. 
    			The token is valid for only 2 minutes.

    			Thanks,
    			Coinplan.`
		};
		transporter.sendMail(mailOptions);
	}
}

function resetPasswordFinal() {

}

module.exports = {
	resetPasswordInit,
	resetPasswordFinal
};
