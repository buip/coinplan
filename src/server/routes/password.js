const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User');
const { validate } = require('jsonschema');
const { log } = require('../log');
const { resetPasswordInit } = require('../controllers/passwordController');
const router = express.Router();

router.put('/', async (req, res) => {
	const validParams = {
		type: 'object',
		maxProperties: 3,
		required: ['email', 'oldPassword', 'newPassword'],
		properties: {
			email: {
				type: 'string',
				minLength: 3,
				maxLength: 254
			},
			oldPassword: {
				type: 'string',
				minLength: 7
			},
			newPassword: {
				type: 'string',
				minLength: 7
			}
		}
	};

	if (!validate(req.body, validParams).valid) {
		res.sendStatus(400);
	} else {
		const { email, oldPassword, newPassword } = req.body;
		try {
			const user = await User.getByEmail(email);
			const isValid = await bcrypt.compare(oldPassword, user.passwordHash);
			if (isValid) {
				await User.updateUserPassword(email, bcrypt.hashSync(newPassword, 10));
				res.sendStatus(200);
			} else {
				throw new Error('Invalid old password');
			}
		} catch (err) {
			res.status(400).send({
				success: false,
				message: err.message
			});
		}
	}
});

router.post('/:user_id', async (req, res) => {
	const validParams = {
		type: 'object',
		maxProperties: 1,
		required: ['user_id'],
		properties: {
			user_id: {
				type: 'string'
			}
		}
	};
	if (!validate(req.params, validParams).valid) {
		res.sendStatus(400);
	} else {
		try {
			const email = req.params.user_id;
			await resetPasswordInit(email);
			res.sendStatus(200);
		} catch (err) {
			log.info('Error while trying reset password', err);
			res.sendStatus(400);
		}
	}
});

module.exports = router;

