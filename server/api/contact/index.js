var express = require('express');
var controller = require('./contact.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/:contactEmail', controller.search);

module.exports = router;