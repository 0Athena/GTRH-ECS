const router = require('express').Router();

/*******************
 * @Router /       *
 *******************/

router.use('/user', require('./user/router'));

module.exports = router;
