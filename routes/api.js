var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');
var formController = require('../controllers/form-controller');

/* GET users listing. */
router.post('/', asyncHandler(formController));

module.exports = router;
