/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const request = require('supertest');

const { recreateDB } = require('../db/common');
const app = require('../../app');

const { iEmail, iPassword, insertUser } = require('./prepareUser');

