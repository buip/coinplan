const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretToken } = require('../../config');

const iName = 'Preston';
const iEmail = 'test@example.com';
const iPassword = 'password';

/**
 * Return promise that includes the token.
 * @returns {Promise<*>}
 */
async function insertUser() {
	await new User(undefined, iName, iEmail, bcrypt.hashSync(iPassword, 10)).insert();
	const user = await User.getByEmail(iEmail);
	const token = jwt.sign({ data: user.id }, secretToken, { expiresIn: 86400 });
	return token;
}

module.exports = {
	iName,
	iEmail,
	iPassword,
	insertUser
};
