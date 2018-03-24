const express = require('express');
const puppies = require('./routes/puppies');
const register = require('./routes/register');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/puppies', puppies);
app.use('/api/register', register);

module.exports = app;