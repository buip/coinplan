const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { validate } = require('jsonschema');

const router = express.Router();

router.post('/', async (req, res) => {
	const validParams = {
		type: 'object',
		maxProperties: 3,
		required: ['name', 'email', 'password'],
		properties: {
			name: {
				type: 'string',
				minLength: 3
			},
			email: {
				type: 'string',
				minLength: 3,
				maxLength: 254
			},
			password: {
				type: 'string',
				minLength: 7
			}
		}
	};

	if (!validate(req.body, validParams).valid) {
		res.sendStatus(400);
	} else {
		const { name, email, password } = req.body;
		const user = new User(undefined, name, email, bcrypt.hashSync(password, 10));

		try {
			await user.insert();
			res.sendStatus(200);
		} catch (err) {
			let message;
			if (err.code === 23505) {
				message = 'User already exists';
			} else {
				message = 'Error while creating user';
			}
			res.status(400).send({
				success: false,
				message: message
			});
		}
	}
});

module.exports = router;
