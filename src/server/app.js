const express = require('express');
const puppies = require('./routes/puppies');
const users = require('./routes/users');
const register = require('./routes/register');
const login = require('./routes/login');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/puppies', puppies);
app.use('/api/users', users);
app.use('/api/register', register);
app.use('/api/login', login);

module.exports = app;