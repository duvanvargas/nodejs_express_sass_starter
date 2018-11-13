var express = require('express');
var router = express.Router();
const sendcontact = require('../libs/send-request');
const dbcore = require('mariadb');
const sendmail = require('nodemailer');
const { sprintf } = require('sprintf-js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Testing html' });
});

module.exports = router;
