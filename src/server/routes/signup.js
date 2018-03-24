const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const validate = require('jsonschema').validate;

const router = express.Router();

router.post('users', async (req, res) => {

    const validParams = {
        type: 'object',
        maxProperties: 2,
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
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const user = new User(undefind, name, email, bcrypt.hashSync(password, 10));

        try {
            await user.insert();
        } catch (err) {
            res.status(err.status).json(
                {
                    message: err.message
                });
        }
    }
});