'use strict';

var express = require('express');
var controller = require('./position.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.post('/new', controller.create);
router.delete('/', controller.destroy);
//router.get('/haha', controller.newTest);

module.exports = router;