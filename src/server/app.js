const express = require('express');
const puppies = require('./routes/puppies');

const app = express();

app.use('/api/puppies', puppies);

module.exports = app;