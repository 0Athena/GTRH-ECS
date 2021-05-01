const express = require('express');
const router = express.Router();
const { catchAsync } = require('utils');
const controller = require('./controllers/user');
const validator = require('./validators/user');

/*************************
 * @Router /user         *
 *************************/

router.post('/', catchAsync(controller.create));

module.exports = router;
