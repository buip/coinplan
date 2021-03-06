const express = require('express');
const users = require('./routes/users');
const register = require('./routes/register');
const login = require('./routes/login');
const password = require('./routes/password');
const transaction = require('./routes/transaction');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', users);
app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/password', password);
app.use('/api/transaction', transaction);

module.exports = app;
